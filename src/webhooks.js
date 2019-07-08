Scoped.define('module:Webhooks', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
            },

            create: function (data, callbacks) {
                this.Connect.post('/v1/api/hook', callbacks, data);
            },

            confirm: function (data, callbacks) {
                this.Connect.post('/v1/api/confirmhook', callbacks, data);
            },

            destroy: function (data, callbacks) {
                this.Connect.post('/v1/api/removehook', callbacks, data);
            }

        };
    });
});
