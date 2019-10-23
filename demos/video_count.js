var app_token = process.argv[2];
var private_key = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.count({}, {
	success: function (count) {
		console.log(count.count);
	},
	failure: function (args, error) {
		console.log(error);
	}
});