/*
	This file shows you how you can use update your video

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
	4. video_tags
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var video_tags = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.update( video_token, { tags: video_tags }, function(data) {
	console.log(data);
});