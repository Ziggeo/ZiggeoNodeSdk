
module.exports = function (token, private_key, encryption_key) {
    this.token = token;
    this.private_key = private_key;
    this.encryption_key = encryption_key;
    this.local = false;
    this.server_api_url = "srvapi.ziggeo.com";
    this.regions = {"r1":"srvapi-eu-west-1.ziggeo.com"};
    this.requestTimeout = 60 * 1000;
};
