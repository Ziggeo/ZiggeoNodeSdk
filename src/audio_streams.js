Scoped.define('module:Audio_streams', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            index: function (audio_token_or_key, data, callbacks) {
                this.ApiConnect.getJSON('/server/v1/audios/bytoken/' + audio_token_or_key + '/streams', callbacks, data);
            },

            get: function (audio_token_or_key, token_or_key, callbacks) {
                this.ApiConnect.getJSON('/server/v1/audios/bytoken/' + audio_token_or_key + '/streams/bytoken/' + token_or_key + '', callbacks);
            },

            download_audio: function (audio_token_or_key, token_or_key, callbacks) {
                this.Connect.getBinary('/v1/server/v1/audios/bytoken/' + audio_token_or_key + '/streams/bytoken/' + token_or_key + '/audio', callbacks);
            },

            destroy: function (audio_token_or_key, token_or_key, callbacks) {
                this.ApiConnect.destroy('/server/v1/audios/bytoken/' + audio_token_or_key + '/streams/bytoken/' + token_or_key + '', callbacks);
            },

            create: function (audio_token_or_key, data, callbacks) {
                var file = null;
                if (data && data.file) {
                    file = data.file;
                    delete data.file;
                }
    if (file) {
        self = this;
        this.Connect.postUploadJSON('/server/v1/audios/' + video_token_or_key + '/streams-upload-url', {
            failure: callbacks ? callbacks.failure : null,
            success: function (result) {
                self.Connect.postJSON('/server/v1/audios/' + video_token_or_key + '/streams/' + result['token'] + '/confirm-video', {
                    failure: callbacks ? callbacks.failure : null,
                    success: function (resultInner) {
                        result = resultInner;
                        if (callbacks && callbacks.success) callbacks.success(result);
                    }
                });
            }
        }, 'stream', data, file, 'video_type');
    } else
                    this.ApiConnect.postJSON('/server/v1/audios/bytoken/' + audio_token_or_key + '/streams', callbacks, data, file);
            }

        };
    });
});
