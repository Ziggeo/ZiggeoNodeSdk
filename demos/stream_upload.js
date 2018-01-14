var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var filename = process.argv[5];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Streams.create(video_token,{
	file: filename
}, function(data){
	console.log(data);
});