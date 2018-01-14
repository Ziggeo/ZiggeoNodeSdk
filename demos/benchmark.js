var app_token = process.argv[2];
var private_key = process.argv[3];
var filename = process.argv[4];
var ops_time = process.argv[5];

var videos = [];


var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var upload_time = Math.floor(Date.now() / 1000);
var download_time = 0;
var delete_time = 0;
uploadVideo();
var upload_counter = 0;
var download_counter = 0;
var delete_counter = 0;
function uploadVideo(){
	if(upload_counter >= ops_time){
		upload_time = Math.floor(Date.now() / 1000) - upload_time;
		upload_time = upload_time/ops_time;
		console.log("Upload: "+upload_time);
		download_time = Math.floor(Date.now() / 1000);
		downloadVideo();
		return;
	}
	ZiggeoSdk.Videos.create({
		file: filename
	}, function(data){
		videos.push(data.token);
		upload_counter += 1;
		uploadVideo();
	});
}

function downloadVideo(){
	if(download_counter >= ops_time){
		download_time = Math.floor(Date.now() / 1000) - download_time;
		download_time = download_time/ops_time;
		console.log("Download: "+download_time);
		delete_time = Math.floor(Date.now() / 1000);
		deleteVideo();
		return;
	}
	ZiggeoSdk.Videos.download_video(videos[download_counter], function(){
		download_counter += 1;
		downloadVideo();
	});
}

function deleteVideo(){
	if(delete_counter >= ops_time){
		delete_time = Math.floor(Date.now() / 1000) - delete_time;
		delete_time = delete_time/ops_time;
		console.log("Delete: "+delete_time);
		return;
	}
	ZiggeoSdk.Videos.destroy(videos[delete_counter], function(){
		delete_counter += 1;
		deleteVideo();
	});
}
