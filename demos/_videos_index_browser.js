/*
	This file shows you our index function and how you can retrieve 100 videos at a time

	Required parameters:
	1. app_token
	2. private_key
*/
var app_token = process.argv[2];
var private_key = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

console.log('Start fetching video tokens ');
var video_to_skip = 0;
var browsers = {};
var total_browser = 0;

indexVideo(0);

function indexVideo (skip) {
	ZiggeoSdk.Videos.index({limit:100, skip: skip}, {
		success: function (index) {
			var video_counter = 0;
			if (index.length > 0) {
				for (var i = 0; i < index.length; ++i) { // iterate fetched result
					var browser = '';
					if (index[i].device_info !== null){
						browser = index[i].device_info.browser;				
					} else {
						browser = 'unknown';
					}
					if (!(browser in browsers)) { // separate browser to array
						browsers[browser] = 1;
					} else {
						browsers[browser] += 1;
					}
					total_browser += 1;
				}
				video_to_skip += index.length;
				indexVideo(video_to_skip); // another call if video still exists
			}else{
				for (var browser in browsers) {
					if (browsers.hasOwnProperty(browser)) {
						console.log('Browser ' + browser + ": " + browsers[browser] + " (" + ((browsers[browser] / total_browser) * 100).toFixed(2) + "%)");
					}
				}
			}
		},
		failure: function (args, error) {
			console.log("failed: " + error);
			return false;
		}
	});
}