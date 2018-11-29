var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(process.argv[2], process.argv[3]);

var video_to_skip = 0;
var count_landscape = 0;
var count_portrait = 0;
console.log('Start fetching video tokens ');
indexVideo(0);
function indexVideo (skip) {
	ZiggeoSdk.Videos.index({limit:100, skip: skip}, {
		success: function (index) {
			var video_counter = 0;
			if (index.length > 0) {
				for (var i = 0; i < index.length; ++i) { // iterate fetched result
					if (index[i].streams[0].video_width > index[i].streams[0].video_height){
						count_landscape += 1;
					} else {
						count_portrait += 1;
					}
				}
				video_to_skip += index.length;
				indexVideo(video_to_skip); // another call if video still exists
			}else{
				console.log('Portrait count = '+count_portrait+' Portrait Percentage = '+((count_portrait/(count_portrait+count_landscape))*100).toFixed(2)+'%');
				console.log('Landscape count = '+count_landscape+' Landscape Percentage = '+((count_landscape/(count_portrait+count_landscape))*100).toFixed(2)+'%');
			}
		},
		failure: function (args, error) {
			console.log("failed: " + error);
			return false;
		}
	});
}