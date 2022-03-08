/*
	This file shows you how to get video data for some video

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
*/
var app_token = process.argv[2];
var app_private = process.argv[3];
var video_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, app_private);

ZiggeoSdk.Videos.get(video_token, {
	success: function (video) {
		console.log (video);
	},
	failure: function(data) {
		console.log(data);
	}
});