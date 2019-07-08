Scoped.define("module:Auth", [
	"base:Class",
	"base:Ajax.Support"
], function (Class, AjaxSupport, scoped) {
	return Class.extend({scoped: scoped}, function (inherited) {
		return {

			constructor: function (Config) {
				inherited.constructor.call(this);
				this.Config = Config;
			},

			__encrypt: function (plaintext) {
				var crypto = require("crypto");
				var shasum = crypto.createHash('md5');
				shasum.update(this.Config.encryption_key);
				var hashed_key = shasum.digest("hex");
				var iv = crypto.randomBytes(8).toString('hex');
				var cipher = crypto.createCipheriv("aes-256-cbc", hashed_key, iv);
				cipher.setAutoPadding(true);
				var encrypted = cipher.update(plaintext, "binary", "hex") + cipher["final"]("hex");
				return iv + encrypted;
			},

			generate: function (options) {
				data = options || {};
				data.application_token = this.Config.token;
				data.nonce = this.__generateNonce();
				return this.__encrypt(JSON.stringify(data));
			},

			__generateNonce: function () {
				var d = new Date();
				return d.getTime() + "" + Math.floor((Math.random() * (Math.pow(2, 32) - 1)));
			}

		};

	});
});