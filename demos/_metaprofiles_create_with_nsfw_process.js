/*
	This file shows you how to create a meta profile with NSFW moderation process

	Required parameters:
	1. app_token
	2. private_key
	3. profile_title
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var profile_title = process.argv[4];


var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.MetaProfiles.create( { title: profile_title }, {
	success: function(data) {
		metaprofile_token = data.token;
		// create nsfw process and `reject` as the action whenever the nsfw found
		ZiggeoSdk.MetaProfileProcess.create_nsfw_process(metaprofile_token, { nsfw_action: 'reject' }, {
			success: function(data) {
				console.log(data)
			}
		})
	},
	failure: function(error) {
		console.log(error);
	}
});