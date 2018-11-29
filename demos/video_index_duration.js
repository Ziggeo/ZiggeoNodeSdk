var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(process.argv[2], process.argv[3]);

var video_to_skip = 0;
console.log('Start fetching video tokens ');
total_duration = 0;
count_duration = 0;
indexVideo(0);
function indexVideo (skip) {
	ZiggeoSdk.Videos.index({limit:100, skip: skip}, {
		success: function (index) {
			var video_counter = 0;
			if (index.length > 0) {
				for (var i = 0; i < index.length; ++i) { // iterate fetched result
					total_duration += index[i].duration;
					count_duration += 1;
				}
				video_to_skip += index.length;
				indexVideo(video_to_skip); // another call if video still exists
			}else{
				console.log("Total Duration = "+total_duration.toFixed(2)+" seconds, Average Duration = "+(total_duration/count_duration).toFixed(2)+" seconds\n");
			}
		},
		failure: function (args, error) {
			console.log("failed: " + error);
			return false;
		}
	});
}