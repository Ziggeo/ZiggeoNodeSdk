ZiggeoSdk = require("../index.js");

var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];

ZiggeoSdk.init(app_token, private_key);

ZiggeoSdk.Videos.update( video_token, {approved: true}, function(data){
	console.log(data);
	console.log('ok');
});