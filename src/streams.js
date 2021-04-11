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
                        if (callbacks && callbacks.success) callbacks.success(result);
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
                        if (callbacks && callbacks.success) callbacks.success(result);
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
                        if (callbacks && callbacks.success) callbacks.success(result);
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
