/*
	This file shows you how you can add filter process to exiting effect profile

	Required parameters:
	1. app_token
	2. private_key
	3. effectprofile_token
	4. filter_effect
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var effectprofile_token = process.argv[4];
var filter_effect = process.argv[5]; // filtes are gray, cartoon, lucis, edge, chill, charcoal, sketch

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var args = {
	filter: filter_effect
};

ZiggeoSdk.EffectProfileProcess.create_filter_process(effectprofile_token, args, function(data) {
	console.log(data);
});