/*
	This file shows you how you can create effect profile and add watermark process at the same time

	Required parameters:
	1. app_token
	2. private_key
	3. effect_profile_title
	4. watermark_file
*/

var app_token = process.argv[2];
var private_key = process.argv[3];
var effect_profile_title = process.argv[4];
var watermark_file = process.argv[5]; // jpg file name

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var args = {
	title: effect_profile_title
};

ZiggeoSdk.EffectProfiles.create(args ,function(data) {
	var profile_token = data.token;
	console.log("profile token created: " + profile_token);
	var filter_args = {
		file: watermark_file,
		vertical_position: 0.5,
		horizontal_position: 0.5,
		video_scale: 0.5
	};

	// change below
	ZiggeoSdk.EffectProfileProcess.create_watermark_process(profile_token, filter_args, function(data) {
		console.log('effect profile created');
	});
});