/*!
ziggeo - v0.1.23 - 2021-01-08
Copyright (c) 
Apache-2.0 Software License.
*/

(function () {
var Scoped = this.subScope();
Scoped.binding('base', 'global:BetaJS');
Scoped.binding('module', 'global:ZiggeoSdk');
Scoped.define("module:", function () {
	return {
    "guid": "dc4166d4-b177-4212-abd5-ab255907a7d8",
    "version": "0.1.23",
    "datetime": 1610132861026
};
});
Scoped.require(['module:'], function (mod) {
	this.exports(typeof module != 'undefined' ? module : null, mod);
}, this);
Scoped.define('module:Analytics', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            get: function (data, callbacks) {
                this.Connect.postJSON('/v1/analytics/get', callbacks, data);
            }

        };
    });
});

Scoped.define('module:Application', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            get: function (callbacks) {
                this.Connect.getJSON('/v1/application', callbacks);
            },

            update: function (data, callbacks) {
                this.Connect.postJSON('/v1/application', callbacks, data);
            },

            get_stats: function (data, callbacks) {
                this.ApiConnect.getJSON('/server/v1/application/stats', callbacks, data);
            }

        };
    });
});

Scoped.define("module:Auth", [
	"base:Class",
	"base:Ajax.Support"
], function (Class, AjaxSupport, scoped) {
	return Class.extend({scoped: scoped}, function (inherited) {
		return {

			constructor: function (Config) {
				inherited.constructor.call(this);
				this.Config = Config;
			},

			__encrypt: function (plaintext) {
				var crypto = require("crypto");
				var shasum = crypto.createHash('md5');
				shasum.update(this.Config.encryption_key);
				var hashed_key = shasum.digest("hex");
				var iv = crypto.randomBytes(8).toString('hex');
				var cipher = crypto.createCipheriv("aes-256-cbc", hashed_key, iv);
				cipher.setAutoPadding(true);
				var encrypted = cipher.update(plaintext, "binary", "hex") + cipher["final"]("hex");
				return iv + encrypted;
			},

			generate: function (options) {
				data = options || {};
				data.application_token = this.Config.token;
				data.nonce = this.__generateNonce();
				return this.__encrypt(JSON.stringify(data));
			},

			__generateNonce: function () {
				var d = new Date();
				return d.getTime() + "" + Math.floor((Math.random() * (Math.pow(2, 32) - 1)));
			}

		};

	});
});
Scoped.define('module:Authtokens', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            get: function (token, callbacks) {
                this.Connect.getJSON('/v1/authtokens/' + token + '', callbacks);
            },

            update: function (token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/authtokens/' + token_or_key + '', callbacks, data);
            },

            destroy: function (token_or_key, callbacks) {
                this.Connect.destroy('/v1/authtokens/' + token_or_key + '', callbacks);
            },

            create: function (data, callbacks) {
                this.Connect.postJSON('/v1/authtokens/', callbacks, data);
            }

        };
    });
});


Scoped.define("module:Config", [
    "base:Class"
], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (token, private_key, encryption_key) {
                inherited.constructor.call(this);
                this.token = token;
                this.private_key = private_key;
                this.encryption_key = encryption_key;
                this.server_api_url = "https://srvapi.ziggeo.com";
                this.regions = {"r1":"https:\/\/srvapi-eu-west-1.ziggeo.com"};
                this.api_url = "https://api-us-east-1.ziggeo.com";
                this.api_regions = {"r1":"https:\/\/api-eu-west-1.ziggeo.com"};
                this.cdn_url = "https://video-cdn.ziggeo.com";
                this.cdn_regions = {"r1":"https:\/\/video-cdn-eu-west-1.ziggeo.com"};
                this.requestTimeout = 60 * 1000;
            }

        };
    });
});

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
Scoped.define('module:EffectProfileProcess', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            index: function (effect_token_or_key, data, callbacks) {
                this.Connect.getJSON('/v1/effects/' + effect_token_or_key + '/process', callbacks, data);
            },

            get: function (effect_token_or_key, token_or_key, callbacks) {
                this.Connect.getJSON('/v1/effects/' + effect_token_or_key + '/process/' + token_or_key + '', callbacks);
            },

            destroy: function (effect_token_or_key, token_or_key, callbacks) {
                this.Connect.destroy('/v1/effects/' + effect_token_or_key + '/process/' + token_or_key + '', callbacks);
            },

            create_filter_process: function (effect_token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/filter', callbacks, data);
            },

            create_watermark_process: function (effect_token_or_key, data, callbacks) {
                var file = null;
                if (data && data.file) {
                    file = data.file;
                    delete data.file;
                }
    if (file) {
        self = this;
        this.Connect.postUploadJSON('/v1/effects/' + effect_token_or_key + '/process/watermark-upload-url', {
            failure: callbacks ? callbacks.failure : null,
            success: function (result) {
                self.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/' + result['token'] + '/confirm-watermark', {
                    failure: callbacks ? callbacks.failure : null,
                    success: function (resultInner) {
                        result = resultInner;
                    }
                });
            }
        }, 'effect_process', data, file, '');
    } else
                    this.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/watermark', callbacks, data, file);
            },

            edit_watermark_process: function (effect_token_or_key, token_or_key, data, callbacks) {
                var file = null;
                if (data && data.file) {
                    file = data.file;
                    delete data.file;
                }
    if (file) {
        self = this;
        this.Connect.postUploadJSON('/v1/effects/' + effect_token_or_key + '/process/' + token_or_key + '/watermark-upload-url', {
            failure: callbacks ? callbacks.failure : null,
            success: function (result) {
                self.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/' + token_or_key + '/confirm-watermark', {
                    failure: callbacks ? callbacks.failure : null,
                    success: function (resultInner) {
                        result = resultInner;
                    }
                });
            }
        }, 'effect_process', data, file, '');
    } else
                    this.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/watermark/' + token_or_key + '', callbacks, data, file);
            }

        };
    });
});

Scoped.define('module:EffectProfiles', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            create: function (data, callbacks) {
                this.Connect.postJSON('/v1/effects/', callbacks, data);
            },

            index: function (data, callbacks) {
                this.Connect.getJSON('/v1/effects/', callbacks, data);
            },

            get: function (token_or_key, callbacks) {
                this.Connect.getJSON('/v1/effects/' + token_or_key + '', callbacks);
            },

            destroy: function (token_or_key, callbacks) {
                this.Connect.destroy('/v1/effects/' + token_or_key + '', callbacks);
            },

            update: function (token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/effects/' + token_or_key + '', callbacks, data);
            }

        };
    });
});

Scoped.define("module:ZiggeoSdk", [
    "base:Class",
    "module:Config",
    "module:Connect",
    "module:Auth",
    "module:Videos",
    "module:Streams",
    "module:Authtokens",
    "module:Application",
    "module:EffectProfiles",
    "module:EffectProfileProcess",
    "module:MetaProfiles",
    "module:MetaProfileProcess",
    "module:Webhooks",
    "module:Analytics"
], function (Class, Config, Connect, Auth, Videos, Streams, Authtokens, Application, EffectProfiles, EffectProfileProcess, MetaProfiles, MetaProfileProcess, Webhooks, Analytics, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (token, private_key, encryption_key) {
                inherited.constructor.call(this);
                this.Config = new Config(token, private_key, encryption_key);
                var server_api_url = this.Config.server_api_url;
                for (var key in this.Config.regions)
                    if (this.Config.token.indexOf(key) === 0)
                        server_api_url = this.Config.regions[key];
                this.Connect = new Connect(this.Config, server_api_url);
                var api_url = this.Config.api_url;
                for (var key in this.Config.api_regions)
                    if (this.Config.token.indexOf(key) === 0)
                        api_url = this.Config.api_regions[key];
                this.ApiConnect = new Connect(this.Config, api_url);
                var cdn_url = this.Config.cdn_url;
                for (var key in this.Config.cdn_regions)
                    if (this.Config.token.indexOf(key) === 0)
                        cdn_url = this.Config.cdn_regions[key];
                this.CdnConnect = new Connect(this.Config, cdn_url);
                this.Auth = new Auth(this.Config);
                this.Videos = new Videos(this.Connect, this.ApiConnect, this.CdnConnect);
                this.Streams = new Streams(this.Connect, this.ApiConnect, this.CdnConnect);
                this.Authtokens = new Authtokens(this.Connect, this.ApiConnect, this.CdnConnect);
                this.Application = new Application(this.Connect, this.ApiConnect, this.CdnConnect);
                this.EffectProfiles = new EffectProfiles(this.Connect, this.ApiConnect, this.CdnConnect);
                this.EffectProfileProcess = new EffectProfileProcess(this.Connect, this.ApiConnect, this.CdnConnect);
                this.MetaProfiles = new MetaProfiles(this.Connect, this.ApiConnect, this.CdnConnect);
                this.MetaProfileProcess = new MetaProfileProcess(this.Connect, this.ApiConnect, this.CdnConnect);
                this.Webhooks = new Webhooks(this.Connect, this.ApiConnect, this.CdnConnect);
                this.Analytics = new Analytics(this.Connect, this.ApiConnect, this.CdnConnect);
            }

        };
    });
});
Scoped.define('module:MetaProfileProcess', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            index: function (meta_token_or_key, callbacks) {
                this.Connect.getJSON('/v1/metaprofiles/' + meta_token_or_key + '/process', callbacks);
            },

            get: function (meta_token_or_key, token_or_key, callbacks) {
                this.Connect.getJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/' + token_or_key + '', callbacks);
            },

            destroy: function (meta_token_or_key, token_or_key, callbacks) {
                this.Connect.destroy('/v1/metaprofiles/' + meta_token_or_key + '/process/' + token_or_key + '', callbacks);
            },

            create_video_analysis_process: function (meta_token_or_key, callbacks) {
                this.Connect.postJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/analysis', callbacks);
            },

            create_audio_transcription_process: function (meta_token_or_key, callbacks) {
                this.Connect.postJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/transcription', callbacks);
            },

            create_nsfw_process: function (meta_token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/nsfw', callbacks, data);
            },

            create_profanity_process: function (meta_token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/profanity', callbacks, data);
            }

        };
    });
});

Scoped.define('module:MetaProfiles', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            create: function (data, callbacks) {
                this.Connect.postJSON('/v1/metaprofiles/', callbacks, data);
            },

            index: function (data, callbacks) {
                this.Connect.getJSON('/v1/metaprofiles/', callbacks, data);
            },

            get: function (token_or_key, callbacks) {
                this.Connect.getJSON('/v1/metaprofiles/' + token_or_key + '', callbacks);
            },

            destroy: function (token_or_key, callbacks) {
                this.Connect.destroy('/v1/metaprofiles/' + token_or_key + '', callbacks);
            }

        };
    });
});

Scoped.define('module:Streams', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            index: function (video_token_or_key, data, callbacks) {
                this.Connect.getJSON('/v1/videos/' + video_token_or_key + '/streams', callbacks, data);
            },

            get: function (video_token_or_key, token_or_key, callbacks) {
                this.Connect.getJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '', callbacks);
            },

            download_video: function (video_token_or_key, token_or_key, callbacks) {
                this.CdnConnect.getBinary('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video', callbacks);
            },

            download_image: function (video_token_or_key, token_or_key, callbacks) {
                this.CdnConnect.getBinary('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image', callbacks);
            },

            push_to_service: function (video_token_or_key, token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/push', callbacks, data);
            },

            destroy: function (video_token_or_key, token_or_key, callbacks) {
                this.Connect.destroy('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '', callbacks);
            },

            create: function (video_token_or_key, data, callbacks) {
                var file = null;
                if (data && data.file) {
                    file = data.file;
                    delete data.file;
                }
    if (file) {
        self = this;
        this.Connect.postUploadJSON('/v1/videos/' + video_token_or_key + '/streams-upload-url', {
            failure: callbacks ? callbacks.failure : null,
            success: function (result) {
                self.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + result['token'] + '/confirm-video', {
                    failure: callbacks ? callbacks.failure : null,
                    success: function (resultInner) {
                        result = resultInner;
                    }
                });
            }
        }, 'stream', data, file, 'video_type');
    } else
                    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams', callbacks, data, file);
            },

            attach_image: function (video_token_or_key, token_or_key, data, callbacks) {
                var file = null;
                if (data && data.file) {
                    file = data.file;
                    delete data.file;
                }
    if (file) {
        self = this;
        this.Connect.postUploadJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image-upload-url', {
            failure: callbacks ? callbacks.failure : null,
            success: function (result) {
                self.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/confirm-image', {
                    failure: callbacks ? callbacks.failure : null,
                    success: function (resultInner) {
                        result = resultInner;
                    }
                });
            }
        }, 'stream', data, file, '');
    } else
                    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image', callbacks, data, file);
            },

            attach_video: function (video_token_or_key, token_or_key, data, callbacks) {
                var file = null;
                if (data && data.file) {
                    file = data.file;
                    delete data.file;
                }
    if (file) {
        self = this;
        this.Connect.postUploadJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video-upload-url', {
            failure: callbacks ? callbacks.failure : null,
            success: function (result) {
                self.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/confirm-video', {
                    failure: callbacks ? callbacks.failure : null,
                    success: function (resultInner) {
                        result = resultInner;
                    }
                });
            }
        }, 'stream', data, file, 'video_type');
    } else
                    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video', callbacks, data, file);
            },

            attach_subtitle: function (video_token_or_key, token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/subtitle', callbacks, data);
            },

            bind: function (video_token_or_key, token_or_key, callbacks) {
                this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/bind', callbacks);
            }

        };
    });
});

Scoped.define('module:Videos', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            index: function (data, callbacks) {
                this.Connect.getJSON('/v1/videos/', callbacks, data);
            },

            count: function (data, callbacks) {
                this.Connect.getJSON('/v1/videos/count', callbacks, data);
            },

            get: function (token_or_key, callbacks) {
                this.Connect.getJSON('/v1/videos/' + token_or_key + '', callbacks);
            },

            get_bulk: function (data, callbacks) {
                this.Connect.postJSON('/v1/videos/get_bulk', callbacks, data);
            },

            stats_bulk: function (data, callbacks) {
                this.Connect.postJSON('/v1/videos/stats_bulk', callbacks, data);
            },

            download_video: function (token_or_key, callbacks) {
                this.CdnConnect.getBinary('/v1/videos/' + token_or_key + '/video', callbacks);
            },

            download_image: function (token_or_key, callbacks) {
                this.CdnConnect.getBinary('/v1/videos/' + token_or_key + '/image', callbacks);
            },

            get_stats: function (token_or_key, callbacks) {
                this.Connect.getJSON('/v1/videos/' + token_or_key + '/stats', callbacks);
            },

            push_to_service: function (token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/videos/' + token_or_key + '/push', callbacks, data);
            },

            apply_effect: function (token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/videos/' + token_or_key + '/effect', callbacks, data);
            },

            apply_meta: function (token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/videos/' + token_or_key + '/metaprofile', callbacks, data);
            },

            update: function (token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/videos/' + token_or_key + '', callbacks, data);
            },

            update_bulk: function (data, callbacks) {
                this.Connect.postJSON('/v1/videos/update_bulk', callbacks, data);
            },

            destroy: function (token_or_key, callbacks) {
                this.Connect.destroy('/v1/videos/' + token_or_key + '', callbacks);
            },

            create: function (data, callbacks) {
                var file = null;
                if (data && data.file) {
                    file = data.file;
                    delete data.file;
                }
    if (file) {
        self = this;
        this.Connect.postUploadJSON('/v1/videos-upload-url', {
            failure: callbacks ? callbacks.failure : null,
            success: function (result) {
                self.Connect.postJSON('/v1/videos/' + result['token'] + '/streams/' + result['default_stream']['token'] + '/confirm-video', {
                    failure: callbacks ? callbacks.failure : null,
                    success: function (resultInner) {
                        result['default_stream'] = resultInner;
                    }
                });
            }
        }, 'video', data, file, 'video_type');
    } else
                    this.Connect.postJSON('/v1/videos/', callbacks, data, file);
            },

            analytics: function (token_or_key, data, callbacks) {
                this.Connect.postJSON('/v1/videos/' + token_or_key + '/analytics', callbacks, data);
            }

        };
    });
});

Scoped.define('module:Webhooks', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            create: function (data, callbacks) {
                this.Connect.post('/v1/api/hook', callbacks, data);
            },

            confirm: function (data, callbacks) {
                this.Connect.post('/v1/api/confirmhook', callbacks, data);
            },

            destroy: function (data, callbacks) {
                this.Connect.post('/v1/api/removehook', callbacks, data);
            }

        };
    });
});

}).call(Scoped);