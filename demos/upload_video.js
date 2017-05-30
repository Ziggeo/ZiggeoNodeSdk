ZiggeoSdk = require("../index.js");

var app_token = process.argv[2];
var private_key = process.argv[3];
var filename = process.argv[4];

ZiggeoSdk.init(app_token, private_key);

ZiggeoSdk.Videos.create({
	file: filename
});