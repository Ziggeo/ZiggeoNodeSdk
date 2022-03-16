/*
	This file shows you how you can get the number of videos you have in your account

	Required parameters:
	1. app_token
	2. private_key
*/
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