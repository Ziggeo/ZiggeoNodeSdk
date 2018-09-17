
module.exports = function (token, private_key, encryption_key) {
    this.token = token;
    this.private_key = private_key;
    this.encryption_key = encryption_key;
    this.server_api_url = "https://srvapi.ziggeo.com";
    this.regions = {"r1":"https:\/\/srvapi-eu-west-1.ziggeo.com"};
    this.api_url = "https://api-us-east-1.ziggeo.com";
    this.api_regions = {"r1":"https:\/\/api-eu-west-1.ziggeo.com"};
    this.requestTimeout = 60 * 1000;
};
