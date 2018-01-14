var ZiggeoSdk = function (token, private_key, encryption_key) {
	this.Config = new ZiggeoSdk.Config(token, private_key, encryption_key);
	this.Connect = new ZiggeoSdk.Connect(this.Config);
	this.Auth = new ZiggeoSdk.Auth(this.Config);
	this.Videos = new ZiggeoSdk.Videos(this.Connect);
    this.Streams = new ZiggeoSdk.Streams(this.Connect);
    this.Authtokens = new ZiggeoSdk.Authtokens(this.Connect);
    this.EffectProfiles = new ZiggeoSdk.EffectProfiles(this.Connect);
    this.EffectProfileProcess = new ZiggeoSdk.EffectProfileProcess(this.Connect);
};

module.exports = ZiggeoSdk;

ZiggeoSdk.Config = function (token, private_key, encryption_key) {
    this.token = token;
    this.private_key = private_key;
    this.encryption_key = encryption_key;
    this.local = false;
    this.server_api_url = "srvapi.ziggeo.com";
    this.regions = {"r1":"srvapi-eu-west-1.ziggeo.com"};
    this.requestTimeout = 60 * 1000;
};

ZiggeoSdk.Connect = function (Config) {
	this.Config = Config;
};

ZiggeoSdk.Connect.prototype.__options = function(method, path, meta) {
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

ZiggeoSdk.Connect.prototype.requestChunks = function (method, path, callbacks, data, file, meta, post_process_data) {
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
			/*
			if (data)
				request.write(require('querystring').stringify(data));
			*/
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

ZiggeoSdk.Connect.prototype.requestBinary = function (method, path, callbacks, data, file, meta) {
	return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
		return Buffer.concat(data);
	});
};

ZiggeoSdk.Connect.prototype.request = function (method, path, callbacks, data, file, meta) {
	return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
		return data.join("");
	});
};

ZiggeoSdk.Connect.prototype.requestJSON = function (method, path, callbacks, data, file, meta) {
	return this.requestChunks(method, path, callbacks, data, file, meta, function (data) {
		return JSON.parse(data.join(""));
	});
};

ZiggeoSdk.Connect.prototype.getBinary = function (path, callbacks, data) {
	this.requestBinary("GET", path, callbacks, data);
};

ZiggeoSdk.Connect.prototype.get = function (path, callbacks, data) {
	this.request("GET", path, callbacks, data);
};

ZiggeoSdk.Connect.prototype.getJSON = function (path, callbacks, data) {
	this.requestJSON("GET", path, callbacks, data);
};

ZiggeoSdk.Connect.prototype.destroy = function (path, callbacks, data) {
	this.request("DELETE", path, callbacks, data);
};

ZiggeoSdk.Connect.prototype.destroyJSON = function (path, callbacks, data) {
	this.requestJSON("DELETE", path, callbacks, data);
};

ZiggeoSdk.Connect.prototype.post = function (path, callbacks, data, file) {
	this.request("POST", path, callbacks, data, file);
};

ZiggeoSdk.Connect.prototype.postJSON = function (path, callbacks, data, file, meta) {
	this.requestJSON("POST", path, callbacks, data, file, meta);
};
ZiggeoSdk.Auth = function (Config) {
    this.Config = Config;
};

ZiggeoSdk.Auth.prototype.__encrypt = function(plaintext) {
	var crypto = require("crypto");
	var shasum = crypto.createHash('md5');
	shasum.update(this.Config.encryption_key);
	var hashed_key = shasum.digest("hex");
	var iv = crypto.randomBytes(8).toString('hex');
	var cipher = crypto.createCipheriv("aes-256-cbc", hashed_key, iv);
	cipher.setAutoPadding(true);
	var encrypted = cipher.update(plaintext, "binary", "hex") + cipher["final"]("hex");
	return iv + encrypted;
};

ZiggeoSdk.Auth.prototype.generate = function(options) {
	data = options || {};
	data.application_token = this.Config.token;
	data.nonce = this.__generateNonce();
	return this.__encrypt(JSON.stringify(data));
};

ZiggeoSdk.Auth.prototype.__generateNonce = function() {
	var d = new Date();
	return d.getTime() + "" + Math.floor((Math.random() * (Math.pow(2, 32) - 1)));
};

ZiggeoSdk.Authtokens = function (Connect) {
  this.Connect = Connect;
};

ZiggeoSdk.Authtokens.prototype.get = function (token, callbacks) {
    this.Connect.getJSON('/v1/authtokens/' + token + '', callbacks);
};

ZiggeoSdk.Authtokens.prototype.update = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/authtokens/' + token_or_key + '', callbacks, data);
};

ZiggeoSdk.Authtokens.prototype.destroy = function (token_or_key, callbacks) {
    this.Connect.destroy('/v1/authtokens/' + token_or_key + '', callbacks);
};

ZiggeoSdk.Authtokens.prototype.create = function (data, callbacks) {
    this.Connect.postJSON('/v1/authtokens/', callbacks, data);
};


ZiggeoSdk.EffectProfileProcess = function (Connect) {
  this.Connect = Connect;
};

ZiggeoSdk.EffectProfileProcess.prototype.index = function (effect_token_or_key, data, callbacks) {
    this.Connect.getJSON('/v1/effects/' + effect_token_or_key + '/process', callbacks, data);
};

ZiggeoSdk.EffectProfileProcess.prototype.get = function (effect_token_or_key, token_or_key, callbacks) {
    this.Connect.getJSON('/v1/effects/' + effect_token_or_key + '/process/' + token_or_key + '', callbacks);
};

ZiggeoSdk.EffectProfileProcess.prototype.destroy = function (effect_token_or_key, token_or_key, callbacks) {
    this.Connect.destroy('/v1/effects/' + effect_token_or_key + '/process/' + token_or_key + '', callbacks);
};

ZiggeoSdk.EffectProfileProcess.prototype.create_filter_process = function (effect_token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/filter', callbacks, data);
};

ZiggeoSdk.EffectProfileProcess.prototype.create_watermark_process = function (effect_token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/watermark', callbacks, data, file);
};


ZiggeoSdk.EffectProfiles = function (Connect) {
  this.Connect = Connect;
};

ZiggeoSdk.EffectProfiles.prototype.create = function (data, callbacks) {
    this.Connect.postJSON('/v1/effects/', callbacks, data);
};

ZiggeoSdk.EffectProfiles.prototype.index = function (data, callbacks) {
    this.Connect.getJSON('/v1/effects/', callbacks, data);
};

ZiggeoSdk.EffectProfiles.prototype.get = function (token_or_key, callbacks) {
    this.Connect.getJSON('/v1/effects/' + token_or_key + '', callbacks);
};

ZiggeoSdk.EffectProfiles.prototype.destroy = function (token_or_key, callbacks) {
    this.Connect.destroy('/v1/effects/' + token_or_key + '', callbacks);
};


ZiggeoSdk.Streams = function (Connect) {
  this.Connect = Connect;
};

ZiggeoSdk.Streams.prototype.index = function (video_token_or_key, data, callbacks) {
    this.Connect.getJSON('/v1/videos/' + video_token_or_key + '/streams', callbacks, data);
};

ZiggeoSdk.Streams.prototype.get = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.getJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '', callbacks);
};

ZiggeoSdk.Streams.prototype.download_video = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.getBinary('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video', callbacks);
};

ZiggeoSdk.Streams.prototype.download_image = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.getBinary('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image', callbacks);
};

ZiggeoSdk.Streams.prototype.push_to_service = function (video_token_or_key, token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/push', callbacks, data);
};

ZiggeoSdk.Streams.prototype.destroy = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.destroy('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '', callbacks);
};

ZiggeoSdk.Streams.prototype.create = function (video_token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams', callbacks, data, file);
};

ZiggeoSdk.Streams.prototype.attach_image = function (video_token_or_key, token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image', callbacks, data, file);
};

ZiggeoSdk.Streams.prototype.attach_video = function (video_token_or_key, token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video', callbacks, data, file);
};

ZiggeoSdk.Streams.prototype.bind = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/bind', callbacks);
};


ZiggeoSdk.Videos = function (Connect) {
  this.Connect = Connect;
};

ZiggeoSdk.Videos.prototype.index = function (data, callbacks) {
    this.Connect.getJSON('/v1/videos/', callbacks, data);
};

ZiggeoSdk.Videos.prototype.get = function (token_or_key, callbacks) {
    this.Connect.getJSON('/v1/videos/' + token_or_key + '', callbacks);
};

ZiggeoSdk.Videos.prototype.download_video = function (token_or_key, callbacks) {
    this.Connect.getBinary('/v1/videos/' + token_or_key + '/video', callbacks);
};

ZiggeoSdk.Videos.prototype.download_image = function (token_or_key, callbacks) {
    this.Connect.getBinary('/v1/videos/' + token_or_key + '/image', callbacks);
};

ZiggeoSdk.Videos.prototype.push_to_service = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + token_or_key + '/push', callbacks, data);
};

ZiggeoSdk.Videos.prototype.apply_effect = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + token_or_key + '/effect', callbacks, data);
};

ZiggeoSdk.Videos.prototype.update = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + token_or_key + '', callbacks, data);
};

ZiggeoSdk.Videos.prototype.destroy = function (token_or_key, callbacks) {
    this.Connect.destroy('/v1/videos/' + token_or_key + '', callbacks);
};

ZiggeoSdk.Videos.prototype.create = function (data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/videos/', callbacks, data, file);
};

