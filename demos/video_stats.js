/*
	Usage: node video_stats.js APP_TOKEN PRIVATE_KEY VIDEO_TOKEN
*/
var app_token = process.argv[2];
var app_private = process.argv[3];
var video_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, app_private);

ZiggeoSdk.Videos.get_stats (video_token, {
	success: function (video) {
		console.log (video);
	},
	failure: function(error){
		console.log(error);
	}
});
