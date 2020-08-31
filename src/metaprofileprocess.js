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
            }

        };
    });
});
