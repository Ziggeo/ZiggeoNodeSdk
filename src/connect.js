Scoped.define("module:Connect", [
	"base:Class",
	"base:Ajax.Support"
], function (Class, AjaxSupport, scoped) {
	return Class.extend({scoped: scoped}, function (inherited) {
		return {

			constructor: function (Config, baseUri) {
				inherited.constructor.call(this);
				this.Config = Config;
				this.baseUri = baseUri;
			},

			requestChunks: function (method, path, callbacks, data, file, meta, post_process_data, raw_path) {
				data = data || {};
				if (typeof file === "string")
					data.file = require("fs").createReadStream(file);
				else
					data.file = file;
				var uri = raw_path ? path : (this.baseUri.replace("://", "://" + this.Config.token + ":" + this.Config.private_key + "@") + path);
				BetaJS.Ajax.Support.execute({
					method: method,
					uri: uri,
					sendContentType: true,
					data: data,
					timeout: this.Config.requestTimeout,
					decodeType: "raw",
					resilience: 5,
					resilience_filter: function (error) {
						return error && error.status_code && error.status_code() < 500;
					}
				}).success(function (result) {
					if (callbacks) {
						if (post_process_data)
							result = post_process_data(result);
						if (callbacks.success)
							callbacks.success(result);
						else
							callbacks(result);
					}
				}).error(function (e) {
					if (callbacks && callbacks.failure)
						callbacks.failure(e);
				});
			},

			requestBinary: function (method, path, callbacks, data, file, meta) {
				return this.requestChunks(method, path, callbacks, data, file, meta);
			},

			request: function (method, path, callbacks, data, file, meta) {
				return this.requestChunks(method, path, callbacks, data, file, meta);
			},

			requestJSON: function (method, path, callbacks, data, file, meta) {
				return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
					try {
						return JSON.parse(data);
					} catch (e) {
						return data;
					}
				});
			},

			getBinary: function (path, callbacks, data) {
				return this.requestBinary("GET", path, callbacks, data);
			},

			get: function (path, callbacks, data) {
				return this.request("GET", path, callbacks, data);
			},

			getJSON: function (path, callbacks, data) {
				return this.requestJSON("GET", path, callbacks, data);
			},

			destroy: function (path, callbacks, data) {
				return this.request("DELETE", path, callbacks, data);
			},

			destroyJSON: function (path, callbacks, data) {
				return this.requestJSON("DELETE", path, callbacks, data);
			},

			post: function (path, callbacks, data, file) {
				return this.request("POST", path, callbacks, data, file);
			},

			postJSON: function (path, callbacks, data, file, meta) {
				return this.requestJSON("POST", path, callbacks, data, file, meta);
			},

			uploadFile: function (url, file, fields, callbacks) {
				return this.requestChunks("POST", url, callbacks, fields, file, null, null, true);
			},

			postUploadJSON: function (path, callbacks, scope, data, file, type_key, meta) {
				callbacks = callbacks || {}
				data = data || {};
				if (type_key && typeof file === "string")
					data[type_key] = (file.split(".").reverse())[0];
				var self = this;
				return this.postJSON(path, {
					failure: callbacks.failure,
					success: function (result) {
						self.uploadFile(result.url_data.url, file, result.url_data.fields, {
							failure: callbacks.failure,
							success: function () {
								if (callbacks.success)
									callbacks.success(result[scope])
							}
						})
					}
				}, data, null, meta);
			}

		};
	});
});