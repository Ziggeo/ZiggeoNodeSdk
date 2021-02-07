
Scoped.define("module:Config", [
    "base:Class"
], function (Class, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (token, private_key, encryption_key) {
                inherited.constructor.call(this);
                this.token = token;
                this.private_key = private_key;
                this.encryption_key = encryption_key;
                this.server_api_url = "https://srv-api.ziggeo.com";
                this.regions = {"r1":"https:\/\/srv-api-eu-west-1.ziggeo.com"};
                this.api_url = "https://api-us-east-1.ziggeo.com";
                this.api_regions = {"r1":"https:\/\/api-eu-west-1.ziggeo.com"};
                this.cdn_url = "https://video-cdn.ziggeo.com";
                this.cdn_regions = {"r1":"https:\/\/video-cdn-eu-west-1.ziggeo.com"};
                this.requestTimeout = 60 * 1000;
            }

        };
    });
});
