/*
	This file shows you how to delete existing server side auth token

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

ZiggeoSdk.Authtokens.destroy(auth_token, {
	success: function (result) {
		console.log(result);
	}
});