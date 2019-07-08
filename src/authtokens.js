Scoped.define('module:Authtokens', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
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
