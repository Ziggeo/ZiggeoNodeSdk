/*
	This file shows you how you can delete video

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
*/
var api_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(api_token, private_key);

ZiggeoSdk.Videos.destroy(video_token, function(data) {
	console.log('deleted');
});