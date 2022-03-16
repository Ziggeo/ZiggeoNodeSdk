/*
	This file shows you how you can push a video to some push service

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
	4. push_service_token
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var push_service_token = process.argv[5];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.push_to_service( video_token, { pushservicetoken: push_service_token }, function(data){
	console.log(data);
});