/*
	Usage: node webhooks_create.js APP_TOKEN PRIVATE_KEY TARGET_URL ENCODING "EVENTS1,EVENTS2"
	Sample: node webhooks_create.js 1234567890abcdef 1234567890abcdef http://example.com jsonheader video_delete,video_create
*/

var app_token = process.argv[2];
var private_key = process.argv[3];
var target_url = process.argv[4];
var encoding = process.argv[5];
var events = process.argv[6];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var options = {
	target_url: target_url,
	encoding: encoding, // json, form, jsonheader
	events: events
}
ZiggeoSdk.Webhooks.create(options,{
	success: function(data){
		console.log("Created webhook token "+data);
	},
	failure: function(error){
		console.log(error);
	}
});