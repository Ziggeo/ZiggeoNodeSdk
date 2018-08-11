var Connect = function (Config) {
	this.Config = Config;
};

Connect.prototype.__options = function(method, path, meta) {
	meta = meta || {};
	var server_api_url = this.Config.server_api_url;
	for (var key in this.Config.regions)
		if (this.Config.token.indexOf(key) === 0 )
			server_api_url = this.Config.regions[key];
	var obj = {
		host: meta.host ? meta.host : server_api_url,
		ssl: "ssl" in meta ? meta.ssl : !this.Config.local,
		path: path,
		method: method,
		timeout: this.Config.requestTimeout,
		headers: {}
	};
	if (!("auth" in meta) || meta.auth)
		obj.headers.Authorization = 'Basic ' + new Buffer(this.Config.token + ':' + this.Config.private_key).toString('base64');
	var i = obj.host.indexOf(':');
	if (i >= 0) {
		obj.port = obj.host.substr(i + 1);
		obj.host = obj.host.substr(0, i);
	}
	return obj;
};

Connect.prototype.requestChunks = function (method, path, callbacks, data, file, meta, post_process_data) {
	var options = this.__options(method, path, meta);
	var post_data = null;
	var timeout = options.timeout;
	if (data) {
		if (method == "GET") {
			options.path = options.path + "?" + require('querystring').stringify(data);
		} else {
			post_data = require('querystring').stringify(data);
			if (post_data.length > 0) {
				options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				if (!file)
					options.headers['Content-Length'] = post_data.length;
			}
		}
	}
	var provider = options.ssl ? require("https") : require("http");
	if (this.Config.local)
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	var request = provider.request(options, function (result) {
		var data = [];
		result.on("data", function (chunk) {
			data.push(chunk);
		}).on("end", function () {
			if (post_process_data)
				data = post_process_data(data);
			if (result.statusCode >= 200 && result.statusCode < 300) {
				if (callbacks) {
					if (callbacks.success)
						callbacks.success(data);
					else
						callbacks(data);
				}
			} else {
				if (callbacks.failure)
					callbacks.failure(data);
			}
		});
	});
	request.on('socket', function(socket) {
		socket.removeAllListeners('timeout');
		socket.setTimeout(timeout, function() {});
		socket.on('timeout', function() {
			request.abort();
		});
	}).on('timeout', function() {
		callbacks(new Error('Request timed out.'));
		request.abort();
	}).on('error', function (e) {});

	if (file) {
		var boundaryKey = Math.random().toString(16);
		request.setHeader('Content-Type', 'multipart/form-data; boundary="'+boundaryKey+'"');
        request.write(
		  '--' + boundaryKey + '\r\n' +
		  'Content-Type: application/octet-stream\r\n' +
		  'Content-Disposition: form-data; name="file"; filename="' + file.replace(/^.*[\\\/]/, '') + '"\r\n' +
		  'Content-Transfer-Encoding: binary\r\n\r\n');
		require("fs").createReadStream(file, {
			bufferSize: 4 * 1024
		}).on('end', function() {
			if (data) {
                for (var postKey in data) {
                    request.write(
                        '\r\n--' + boundaryKey + '\r\n' +
                        'Content-Disposition: form-data; name="' + postKey + '"\r\n\r\n' +
						data[postKey]
					);
				}
			}
			request.end('\r\n--' + boundaryKey + '--');
		}).pipe(request, {
			end: false
		});
	} else {
		if (post_data && post_data.length > 0)
			request.write(post_data);
		request.end();
	}
};

Connect.prototype.requestBinary = function (method, path, callbacks, data, file, meta) {
	return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
		return Buffer.concat(data);
	});
};

Connect.prototype.request = function (method, path, callbacks, data, file, meta) {
	return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
		return data.join("");
	});
};

Connect.prototype.requestJSON = function (method, path, callbacks, data, file, meta) {
	return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
		return JSON.parse(data.join(""));
	});
};

Connect.prototype.getBinary = function (path, callbacks, data) {
	this.requestBinary("GET", path, callbacks, data);
};

Connect.prototype.get = function (path, callbacks, data) {
	this.request("GET", path, callbacks, data);
};

Connect.prototype.getJSON = function (path, callbacks, data) {
	this.requestJSON("GET", path, callbacks, data);
};

Connect.prototype.destroy = function (path, callbacks, data) {
	this.request("DELETE", path, callbacks, data);
};

Connect.prototype.destroyJSON = function (path, callbacks, data) {
	this.requestJSON("DELETE", path, callbacks, data);
};

Connect.prototype.post = function (path, callbacks, data, file) {
	this.request("POST", path, callbacks, data, file);
};

Connect.prototype.postJSON = function (path, callbacks, data, file, meta) {
	this.requestJSON("POST", path, callbacks, data, file, meta);
};

module.exports = Connect;