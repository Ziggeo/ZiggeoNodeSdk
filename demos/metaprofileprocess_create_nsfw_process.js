/*
	This file shows you how to add NSFW moderation process to given meta profile

	Required parameters:
	1. app_token
	2. private_key
	3. metaprofile_token
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var metaprofile_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

// create nsfw process and `reject` as the action whenever the nsfw found
ZiggeoSdk.MetaProfileProcess.create_nsfw_process(metaprofile_token, { nsfw_action: 'reject' }, {
	success: function(data) {
		console.log(data)
	}
});