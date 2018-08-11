var Auth = function (Config) {
    this.Config = Config;
};

Auth.prototype.__encrypt = function(plaintext) {
	var crypto = require("crypto");
	var shasum = crypto.createHash('md5');
	shasum.update(this.Config.encryption_key);
	var hashed_key = shasum.digest("hex");
	var iv = crypto.randomBytes(8).toString('hex');
	var cipher = crypto.createCipheriv("aes-256-cbc", hashed_key, iv);
	cipher.setAutoPadding(true);
	var encrypted = cipher.update(plaintext, "binary", "hex") + cipher["final"]("hex");
	return iv + encrypted;
};

Auth.prototype.generate = function(options) {
	data = options || {};
	data.application_token = this.Config.token;
	data.nonce = this.__generateNonce();
	return this.__encrypt(JSON.stringify(data));
};

Auth.prototype.__generateNonce = function() {
	var d = new Date();
	return d.getTime() + "" + Math.floor((Math.random() * (Math.pow(2, 32) - 1)));
};

module.exports = Auth;