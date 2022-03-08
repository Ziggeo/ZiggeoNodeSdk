/*
	This file shows you how you can update multiple videos at the same time

	Required parameters:
	1. app_token
	2. private_key
	3. video_tokens
	4. video_tags
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_tokens = process.argv[4];
var video_tags = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.update_bulk({ tokens_or_keys:video_tokens, tags: video_tags }, {
	success: function(data){
		console.log(data);
	},
	failure: function(error){
		console.log(error);
	}
});