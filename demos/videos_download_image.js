/*
	This file shows you how to download the image of specific video

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
*/
var fs = require('fs');

var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.download_image(video_token, {
	success: function (data) {
		fs.writeFileSync(video_token + '.jpg', Buffer.from(data, "binary"));
	}
});