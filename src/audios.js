Scoped.define('module:Audios', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            index: function (data, callbacks) {
                this.ApiConnect.getJSON('/v1/audios/', callbacks, data);
            },

            count: function (data, callbacks) {
                this.ApiConnect.getJSON('/v1/audios/count', callbacks, data);
            },

            get: function (token_or_key, callbacks) {
                this.ApiConnect.getJSON('/v1/audios/' + token_or_key + '', callbacks);
            },

            get_bulk: function (data, callbacks) {
                this.ApiConnect.postJSON('/v1/audios/get-bulk', callbacks, data);
            },

            download_audio: function (token_or_key, callbacks) {
                this.Connect.getBinary('/v1/audios/' + token_or_key + '/audio', callbacks);
            },

            update: function (token_or_key, data, callbacks) {
                this.ApiConnect.postJSON('/v1/audios/' + token_or_key + '', callbacks, data);
            },

            update_bulk: function (data, callbacks) {
                this.ApiConnect.postJSON('/v1/audios/update-bulk', callbacks, data);
            },

            destroy: function (token_or_key, callbacks) {
                this.ApiConnect.destroy('/v1/audios/' + token_or_key + '', callbacks);
            },

            create: function (data, callbacks) {
                var file = null;
                if (data && data.file) {
                    file = data.file;
                    delete data.file;
                }
    if (file) {
        self = this;
        this.Connect.postUploadJSON('/v1/audios-upload-url', {
            failure: callbacks ? callbacks.failure : null,
            success: function (result) {
                self.Connect.postJSON('/v1/audios/' + result['token'] + '/streams/' + result['default_stream']['token'] + '/confirm-audio', {
                    failure: callbacks ? callbacks.failure : null,
                    success: function (resultInner) {
                        result['default_stream'] = resultInner;
                        if (callbacks && callbacks.success) callbacks.success(result);
                    }
                });
            }
        }, 'audio', data, file, 'audio_type');
    } else
                    this.ApiConnect.postJSON('/v1/audios/', callbacks, data, file);
            }

        };
    });
});
