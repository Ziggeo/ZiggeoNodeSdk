var ZiggeoSdk = {
	
	init: function (token, private_key, encryption_key) {
		ZiggeoSdk.Config.token = token;
		ZiggeoSdk.Config.private_key = private_key;
		ZiggeoSdk.Config.encryption_key = encryption_key;
	}
	
};

module.exports = ZiggeoSdk;

ZiggeoSdk.Config = {
	local: false,
	server_api_url: "srvapi.ziggeo.com"
};

ZiggeoSdk.Connect = {
	
	__options: function(method, path, meta) {
		meta = meta || {};
		var obj = {
			host: meta.host ? meta.host : ZiggeoSdk.Config.server_api_url,
			ssl: "ssl" in meta ? meta.ssl : !ZiggeoSdk.Config.local,
			path: path,
			method: method,
			headers: {}
		};
		if (!("auth" in meta) || meta.auth)
			obj.headers.Authorization = 'Basic ' + new Buffer(ZiggeoSdk.Config.token + ':' + ZiggeoSdk.Config.private_key).toString('base64');
		var i = obj.host.indexOf(':');
		if (i >= 0) {
			obj.port = obj.host.substr(i + 1);
			obj.host = obj.host.substr(0, i);
		}
		return obj;
	},
	
	__http: require("http"),
	
	__https: require("https"),
	
	__querystring: require('querystring'),
	
	__fs: require("fs"),
	
	requestChunks: function (method, path, callbacks, data, file, meta, post_process_data) {
		var options = this.__options(method, path, meta);
		var post_data = null;
		if (data) {
			if (method == "GET") {
				options.path = options.path + "?" + this.__querystring.stringify(data);
			} else {
				post_data = this.__querystring.stringify(data);
				if (post_data.length > 0) {
					options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
					options.headers['Content-Length'] = post_data.length;
				}
			}			
		}
		var provider = options.ssl ? this.__https : this.__http;
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
		if (file) {
			var boundaryKey = Math.random().toString(16);
			request.setHeader('Content-Type', 'multipart/form-data; boundary="'+boundaryKey+'"');
			request.write( 
			  '--' + boundaryKey + '\r\n' +
			  'Content-Type: application/octet-stream\r\n' + 
			  'Content-Disposition: form-data; name="file"; filename="' + file.replace(/^.*[\\\/]/, '') + '"\r\n' +
			  'Content-Transfer-Encoding: binary\r\n\r\n');
			this.__fs.createReadStream(file, {
				bufferSize: 4 * 1024
			}).on('end', function() {
				/*
				if (data)
					request.write(this.__querystring.stringify(data));
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
			return JSON.parse(data.join(""));
		});
	},
	
	getBinary: function (path, callbacks, data) {
		this.requestBinary("GET", path, callbacks, data);
	},

	get: function (path, callbacks, data) {
		this.request("GET", path, callbacks, data);
	},
	
	getJSON: function (path, callbacks, data) {
		this.requestJSON("GET", path, callbacks, data);
	},
	
	destroy: function (path, callbacks, data) {
		this.request("DELETE", path, callbacks, data);
	},
	
	destroyJSON: function (path, callbacks, data) {
		this.requestJSON("DELETE", path, callbacks, data);
	},
	
	post: function (path, callbacks, data, file) {
		this.request("POST", path, callbacks, data, file);
	},
	
	postJSON: function (path, callbacks, data, file, meta) {
		this.requestJSON("POST", path, callbacks, data, file, meta);
	}
	
};
ZiggeoSdk.Auth = {

	__encrypt : function(plaintext) {
		var crypto = require("crypto");
		var shasum = crypto.createHash('md5');
		shasum.update(ZiggeoSdk.Config.encryption_key);
		var hashed_key = shasum.digest("hex");
		var iv = crypto.randomBytes(8).toString('hex');
		var cipher = crypto.createCipheriv("aes-256-cbc", hashed_key, iv);
		cipher.setAutoPadding(true);
		var encrypted = cipher.update(plaintext, "binary", "hex") + cipher["final"]("hex");
		return iv + encrypted;
	},

	generate : function(options) {
		data = options || {};
		data.application_token = ZiggeoSdk.Config.token;
		data.nonce = this.__generateNonce();
		return this.__encrypt(JSON.stringify(data));
	},

	__generateNonce : function() {
		var d = new Date();
		return d.getTime() + "" + Math.floor((Math.random() * (Math.pow(2, 32) - 1)));
	}
};

ZiggeoSdk.Videos = {

  index: function (data, callbacks) {
    ZiggeoSdk.Connect.getJSON('/v1/videos/', callbacks, data);
  },

  get: function (token_or_key, callbacks) {
    ZiggeoSdk.Connect.getJSON('/v1/videos/' + token_or_key + '', callbacks);
  },

  download_video: function (token_or_key, callbacks) {
    ZiggeoSdk.Connect.getBinary('/v1/videos/' + token_or_key + '/video', callbacks);
  },

  download_image: function (token_or_key, callbacks) {
    ZiggeoSdk.Connect.getBinary('/v1/videos/' + token_or_key + '/image', callbacks);
  },

  update: function (token_or_key, data, callbacks) {
    ZiggeoSdk.Connect.postJSON('/v1/videos/' + token_or_key + '', callbacks, data);
  },

  destroy: function (token_or_key, callbacks) {
    ZiggeoSdk.Connect.destroy('/v1/videos/' + token_or_key + '', callbacks);
  },

  create: function (data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    ZiggeoSdk.Connect.postJSON('/v1/videos/', callbacks, data, file);
  }

};
ZiggeoSdk.Streams = {

  index: function (video_token_or_key, data, callbacks) {
    ZiggeoSdk.Connect.getJSON('/v1/videos/' + video_token_or_key + '/streams', callbacks, data);
  },

  get: function (video_token_or_key, token_or_key, callbacks) {
    ZiggeoSdk.Connect.getJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '', callbacks);
  },

  download_video: function (video_token_or_key, token_or_key, callbacks) {
    ZiggeoSdk.Connect.getBinary('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video', callbacks);
  },

  download_image: function (video_token_or_key, token_or_key, callbacks) {
    ZiggeoSdk.Connect.getBinary('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image', callbacks);
  },

  destroy: function (video_token_or_key, token_or_key, callbacks) {
    ZiggeoSdk.Connect.destroy('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '', callbacks);
  },

  create: function (video_token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    ZiggeoSdk.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams', callbacks, data, file);
  },

  attach_image: function (video_token_or_key, token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    ZiggeoSdk.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image', callbacks, data, file);
  },

  attach_video: function (video_token_or_key, token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    ZiggeoSdk.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video', callbacks, data, file);
  },

  bind: function (video_token_or_key, token_or_key, callbacks) {
    ZiggeoSdk.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/bind', callbacks);
  }

};
ZiggeoSdk.Authtokens = {

  get: function (token, callbacks) {
    ZiggeoSdk.Connect.getJSON('/v1/authtokens/' + token + '', callbacks);
  },

  update: function (token_or_key, data, callbacks) {
    ZiggeoSdk.Connect.postJSON('/v1/authtokens/' + token_or_key + '', callbacks, data);
  },

  destroy: function (token_or_key, callbacks) {
    ZiggeoSdk.Connect.destroy('/v1/authtokens/' + token_or_key + '', callbacks);
  },

  create: function (data, callbacks) {
    ZiggeoSdk.Connect.postJSON('/v1/authtokens/', callbacks, data);
  }

};