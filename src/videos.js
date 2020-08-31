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
