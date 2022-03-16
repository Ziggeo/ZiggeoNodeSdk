/*
	This file shows you how you can get stats for the video

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

ZiggeoSdk.Videos.get_stats(video_token, {
	success: function(video) {
		console.log (video);
	},
	failure: function(error){
		console.log(error);
	}
});