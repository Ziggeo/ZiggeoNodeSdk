/*
	This file shows you how you can add watermark process to existing effect profile

	Required parameters:
	1. app_token
	2. private_key
	3. effectprofile_token
	4. watermark_file
*/

var app_token = process.argv[2];
var private_key = process.argv[3];
var effectprofile_token = process.argv[4];
var watermark_file = process.argv[5]; // jpg file name

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var args = {
	file: watermark_file,
	vertical_position: 0.5,
	horizontal_position: 0.5,
	video_scale: 0.5
};

// change below
ZiggeoSdk.EffectProfileProcess.create_watermark_process(effectprofile_token, args, function(data) {
	console.log('effect profile created');
});