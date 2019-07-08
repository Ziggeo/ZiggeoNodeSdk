Scoped.define('module:EffectProfileProcess', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
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
                this.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/watermark', callbacks, data, file);
            }

        };
    });
});
