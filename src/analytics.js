Scoped.define('module:Analytics', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
            },

            get: function (data, callbacks) {
                this.Connect.postJSON('/v1/analytics/get', callbacks, data);
            }

        };
    });
});
