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
                        if (callbacks && callbacks.success) callbacks.success(result);
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
                        if (callbacks && callbacks.success) callbacks.success(result);
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
