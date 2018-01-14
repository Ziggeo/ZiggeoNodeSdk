fs = require('fs');
var api_token = process.argv[2];
var private_key = process.argv[3];
var list_file = process.argv[4];


var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var list_data = JSON.parse(fs.readFileSync(list_file, 'utf8'));
var file_to_delete = list_data.data;
var video_counter = 0;
var total_video = file_to_delete.length;
console.log(file_to_delete);
if(file_to_delete.length > 1){
	console.log('Start deleting '+file_to_delete.length+' videos');
	deleteVideo();
}

function deleteVideo(){
	if(file_to_delete.length > 0){
		video_counter +=1;
		var token_to_delete = file_to_delete.shift();
		console.log('Start deleting '+token_to_delete);
		ZiggeoSdk.Videos.destroy(token_to_delete, {
			success: function(result){
				console.log('Deleted video '+video_counter+' of '+total_video);
				deleteVideo();
			}
		});
	}
}