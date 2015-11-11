ZiggeoSdk = require("../index.js");

ZiggeoSdk.init(process.argv[2], process.argv[3]);

ZiggeoSdk.Videos.create({
	file: process.argv[4]
});