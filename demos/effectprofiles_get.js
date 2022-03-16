/*
	This file shows you how you can get details about some effect profile

	Required parameters:
	1. app_token
	2. private_key
	3. effectprofile_token
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var effectprofile_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.EffectProfiles.get(effectprofile_token, function(effects) {
	console.log(effects);
});