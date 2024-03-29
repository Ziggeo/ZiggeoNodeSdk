/*
	This file shows you how you can apply effect on existing video

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
	4. effect_profile_token
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var effect_profile_token = process.argv[5];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.apply_effect( video_token, { effectprofiletoken: effect_profile_token }, function(data) {
	console.log(data);
});