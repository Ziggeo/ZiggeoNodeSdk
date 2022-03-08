/*
	This file shows you how you can use our update call to approve the video

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.update( video_token, {approved: true}, function(data){
	console.log(data);
});