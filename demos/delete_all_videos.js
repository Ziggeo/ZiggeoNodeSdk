var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(process.argv[2], process.argv[3]);

var video_to_delete = [];
var video_to_skip = 0;
console.log('Start fetching video tokens ');
indexRemoveVideo(0);
function indexRemoveVideo (skip) {
	ZiggeoSdk.Videos.index({limit:100, skip: skip}, {
		success: function (index) {
			var video_counter = 0;
			// console.log(data);
			if (index.length > 0) {
				for (var i = 0; i < index.length; ++i) {
					video_to_delete.push(index[i].token);
				}
				video_to_skip += index.length;
				indexRemoveVideo(video_to_skip);
			}else{
				console.log("Video tokens fetched : "+video_to_delete.length);
				deleteVideo(video_to_delete);
			}
		},
		failure: function (args, error) {
			console.log("failed: " + error);
			return false;
		}
	});
}

function deleteVideo (token_list) {
	console.log('Start deleting '+token_list.length+' videos');
	var video_counter = 0;
	for (var i = 0; i < token_list.length; i++) {
		ZiggeoSdk.Videos.destroy(token_list[i],{
			success: function (result) {
				// to show progress on the console until it's done.
				video_counter += 1;
				console.log('Deleted video '+video_counter+' of '+token_list.length+' videos');
				if (video_counter == token_list.length) {
					console.log ('Deletion of all videos is completed.');
				}
			}
		});
	}
}
