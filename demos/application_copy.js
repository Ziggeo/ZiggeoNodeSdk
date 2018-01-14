var fs = require('fs');
var source_app_token = process.argv[2];
var source_private_key = process.argv[3];
var target_app_token = process.argv[4];
var target_private_key = process.argv[5];
var video_to_skip = 0;
var video_array = [];

var Ziggeo = require("../index.js");
var ZiggeoSdkSource = new Ziggeo(source_app_token, source_private_key);
var ZiggeoSdkTarget = new Ziggeo(target_app_token, target_private_key);

indexVideo(0);
function indexVideo (skip) {
	// to get all video and arrange it so the oldest one comes first.
    ZiggeoSdkSource.Videos.index({limit:100, skip: skip}, {
		success: function (index) {
			var video_counter = 0;
			if (index.length > 0) {
				for (var i = 0; i < index.length; ++i) { // iterate fetched result
					video_array.unshift(index[i].token);
				}
				video_to_skip += index.length;
				indexVideo(video_to_skip); // another call if video still exists
			}else{
				
				downloadVideo(video_array);
			}
		},
		failure: function (args, error) {
			console.log("failed: " + error);
			return false;
		}
	});
}

function downloadVideo(video_array){
	var video_to_download = video_array.shift();
	console.log(video_to_download);
	if(video_to_download == undefined){
		return;
	}
    ZiggeoSdkSource.Videos.download_video(video_to_download, function(data){
		var file_name = 'temp_video/'+video_to_download+'.mp4';
		fs.writeFile(file_name, data, function(err){
            console.log('downloaded\n');
            ZiggeoSdkTarget.Videos.create({
            	file: file_name
            }, function(){
            	console.log('uploaded\n');
            	downloadVideo(video_array);
            });
        });
	});
}