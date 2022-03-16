/*
	This file shows you our index function and how you can retrieve 100 videos at a time

	Required parameters:
	1. app_token
	2. private_key
	3. target_url
	4. encoding
	5. events
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var target_url = process.argv[4];
var encoding = process.argv[5];
var events = process.argv[6];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var args = {
	target_url: target_url,
	encoding: encoding, // json, form, jsonheader
	events: events
}

ZiggeoSdk.Webhooks.create(args,{
	success: function(data) {
		console.log("Created webhook token " + data);
	},
	failure: function(error) {
		console.log(error);
	}
});