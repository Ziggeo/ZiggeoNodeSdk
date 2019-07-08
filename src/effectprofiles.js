Scoped.define('module:EffectProfiles', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
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
