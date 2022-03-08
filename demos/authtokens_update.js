/*
	This file shows you how to update existing auth token

	Required parameters:
	1. app_token
	2. private_key
	3. auth_token
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var auth_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Authtokens.update(auth_token, { session_limit: 1000 }, {
	success: function (result) {
		console.log(result);
	}
});