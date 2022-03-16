/*
	This file shows you how you can grab all existing effect profiles within your app

	Required parameters:
	1. app_token
	2. private_key
*/
var app_token = process.argv[2];
var app_private = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, app_private);

var args = {
	limit: 50
};

ZiggeoSdk.EffectProfiles.index(args, function(effects) {
	console.log(effects);
});