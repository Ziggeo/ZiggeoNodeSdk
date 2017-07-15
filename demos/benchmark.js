ZiggeoSdk = require("../index.js");

var app_token = process.argv[2];
var private_key = process.argv[3];
var filename = process.argv[4];
var ops_time = process.argv[5];

var videos = [];


ZiggeoSdk.init(app_token, private_key);
var upload_time = Math.floor(Date.now() / 1000);
uploadVideo();
var download_counter = 0;
function uploadVideo(){
	if(download_counter >= ops_time){
		upload_time = Math.floor(Date.now() / 1000) - upload_time;
		upload_time = upload_time/ops_time;
		console.log("Upload: "+upload_time);
		return;
	}
	ZiggeoSdk.Videos.create({
		file: filename
	}, function(data){
		console.log(data.token);
		download_counter += 1;
		uploadVideo();
	});
}