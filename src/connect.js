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

			requestChunks: function (method, path, callbacks, data, file, meta, post_process_data) {
				data = data || {};
				if (typeof file === "string")
					data.file = require("fs").createReadStream(file);
				BetaJS.Ajax.Support.execute({
					method: method,
					uri: this.baseUri.replace("://", "://" + this.Config.token + ":" + this.Config.private_key + "@") + path,
					sendContentType: true,
					data: data,
					timeout: this.Config.requestTimeout
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
				return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
					return Buffer.concat(data);
				});
			},

			request: function (method, path, callbacks, data, file, meta) {
				return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
					return data.join("");
				});
			},

			requestJSON: function (method, path, callbacks, data, file, meta) {
				return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
					try {
						return JSON.parse(data.join(""));
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
			}

		};
	});
});