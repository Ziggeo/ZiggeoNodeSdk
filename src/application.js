Scoped.define('module:Application', ['base:Class'], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (Connect, ApiConnect, CdnConnect) {
                inherited.constructor.call(this);
                this.Connect = Connect;
                this.ApiConnect = ApiConnect;
                this.CdnConnect = CdnConnect;
            },

            get: function (callbacks) {
                this.Connect.getJSON('/v1/application', callbacks);
            },

            update: function (data, callbacks) {
                this.Connect.postJSON('/v1/application', callbacks, data);
            },

            get_stats: function (data, callbacks) {
                this.ApiConnect.getJSON('/server/v1/application/stats', callbacks, data);
            }

        };
    });
});
