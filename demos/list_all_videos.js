var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(process.argv[2], process.argv[3]);

var video_to_skip = 0;
console.log('Start fetching video tokens ');
indexVideo(0);
function indexVideo (skip) {
	ZiggeoSdk.Videos.index({limit:100, skip: skip}, {
		success: function (index) {
			var video_counter = 0;
			if (index.length > 0) {
				for (var i = 0; i < index.length; ++i) { // iterate fetched result
					console.log(index[i]);
				}
				video_to_skip += index.length;
				indexVideo(video_to_skip); // another call if video still exists
			}
		},
		failure: function (args, error) {
			console.log("failed: " + error);
			return false;
		}
	});
}