var app_token = process.argv[2];
var private_key = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

console.log('Start fetching video tokens ');

// 'limit' will limit how much index operation will fetch the videos. default 50 max 100
ZiggeoSdk.Videos.index({limit:100}, {
	success: function (index) {
		var video_counter = 0;
		if (index.length > 0) {
			for (var i = 0; i < index.length; ++i) { // iterate fetched result
				console.log(index[i]);
			}
		}
	},
	failure: function (args, error) {
		console.log("failed: " + error);
		return false;
	}
});