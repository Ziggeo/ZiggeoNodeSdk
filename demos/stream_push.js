var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var stream_token = process.argv[5];
var push_service_token = process.argv[6];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Streams.push_to_service( video_token, stream_token, {pushservicetoken: push_service_token}, function(data){
	console.log(data);
	console.log('ok');
});