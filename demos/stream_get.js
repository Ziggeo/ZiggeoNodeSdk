var app_token = process.argv[2];
var app_private = process.argv[3];
var video_token = process.argv[4];
var stream_token = process.argv[5];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, app_private);

ZiggeoSdk.Streams.get (video_token, stream_token, {
	success: function (video) {
		console.log (video);
	}
});
