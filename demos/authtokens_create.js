/*
	This file shows you how to create server side auth token

	Required parameters:
	1. app_token
	2. private_key
*/

var app_token = process.argv[2];
var private_key = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Authtokens.create({ session_limit: 200 }, {
	success: function (result) {
		console.log(result);
	}
});