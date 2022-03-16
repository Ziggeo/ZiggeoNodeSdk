/*
	This file shows you how you can push some specific stream to any of your push services

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
	4. stream_token
	5. push_service_token
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var stream_token = process.argv[5];
var push_service_token = process.argv[6];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Streams.push_to_service( video_token, stream_token, { pushservicetoken: push_service_token }, function(data) {
	console.log(data);
});