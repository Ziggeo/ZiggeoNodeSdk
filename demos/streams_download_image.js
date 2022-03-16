/*
	This file shows you how you could download image of some specific stream

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
	4. stream_token
*/
var fs = require('fs');
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var stream_token = process.argv[5];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Streams.download_image(video_token, stream_token, {
	success: function (data) {
		fs.writeFileSync(video_token + '_' + stream_token + '.jpg', Buffer.from(data, "binary"));
	}
});