/*
	This file shows you how to read the file with video tokens to delete videos

	Required parameters:
	1. app_token
	2. private_key
	3. file_with_video_tokens
*/
fs = require('fs');
var app_token = process.argv[2];
var private_key = process.argv[3];
var file_with_video_tokens = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var list_data = JSON.parse(fs.readFileSync(file_with_video_tokens, 'utf8'));
var video_tokens_to_delete = list_data.data;
var video_counter = 0;
var total_videos = video_tokens_to_delete.length;

console.log(video_tokens_to_delete);

if(video_tokens_to_delete.length > 1){
	console.log('Start deleting ' + video_tokens_to_delete.length + ' videos');
	deleteVideo();
}

function deleteVideo() {
	if(video_tokens_to_delete.length > 0) {
		video_counter +=1;
		var token_to_delete = video_tokens_to_delete.shift();
		console.log('Start deleting ' + token_to_delete);

		ZiggeoSdk.Videos.destroy(token_to_delete, {
			success: function(result){
				console.log('Deleted video ' + video_counter + ' of ' + total_videos);
				deleteVideo();
			}
		});
	}
}