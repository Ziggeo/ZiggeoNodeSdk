Scoped.define('module:MetaProfiles', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
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
