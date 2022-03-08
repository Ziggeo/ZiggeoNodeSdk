/*
	This file shows you how to attach subtitle to a video stream.
	* Subtitle used in demo is located under resources/subtitle.vtt

	Required parameters:
	1. app_token
	2. private_key
	3. video_token
	4. stream_token
*/
var fs = require("fs");
var Ziggeo = require("../index.js");

var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var stream_token = process.argv[5];

var ZiggeoSdk = new Ziggeo(app_token, private_key);

fs.readFile("resources/subtitle.vtt", "utf8", function(err, webvtt_subtitle) {
	ZiggeoSdk.Streams.attach_subtitle(video_token, stream_token, {
		lang: "en", // subtitle language
		label: "English", // label that is shown on video player
		data: webvtt_subtitle // subtitle in webvtt format
	}, {
		success: function() {
			// Retrieve video data to confirm it worked - not necessary
			ZiggeoSdk.Streams.get(video_token, stream_token, {
				success: function(video_data) {
					console.log(video_data.subtitles);
				}
			}) 
		}
	});
});