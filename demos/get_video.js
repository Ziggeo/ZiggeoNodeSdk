ZiggeoSdk = require("../index.js");
var app_token = process.argv[2];
var app_private = process.argv[3];
var video_token = process.argv[4];

ZiggeoSdk.init (app_token, app_private);

ZiggeoSdk.Videos.get (video_token, {
	success: function (video) {
		console.log (video);
	}
});
