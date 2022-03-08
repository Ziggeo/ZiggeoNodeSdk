/*
	This file shows you how to get stats info for multiple videos

	Required parameters:
	1. app_token
	2. private_key
	3. video_tokens
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_tokens = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.stats_bulk({ tokens_or_keys: video_tokens }, {
	success: function (videos) {
		if (videos.length > 0) {
			for (var i = 0; i < videos.length; ++i) { // iterate fetched result
				console.log(videos[i].token);
			}
		}
	},
	failure: function (error) {
		console.log(error);
	}
});