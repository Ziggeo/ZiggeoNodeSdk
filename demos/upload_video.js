var app_token = process.argv[2];
var private_key = process.argv[3];
var filename = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.create({
	file: filename
}, function(data){
	console.log(data);
});