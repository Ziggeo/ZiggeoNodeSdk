/*
	This file shows you how to find all meta profiles that are created within your application

	Required parameters:
	1. app_token
	2. private_key
*/
var app_token = process.argv[2];
var private_key = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var args = {
	limit: 100,
	skip: 0,
	reverse: false
};

ZiggeoSdk.MetaProfiles.index(args, {
	success: function(data) {
		console.log(data);
	},
	failure: function(error) {
		console.log(error);
	}
});