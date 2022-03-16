/*
	This file shows you how to get analytics data

	Required parameters:
	1. app_token
	2. private_key
	3. query
*/
var app_token = process.argv[2];
var app_private = process.argv[3];
var query = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, app_private);

var date = new Date().getTime()
// get all data from the beginning 
var args = {
	from: 0,
	to: Date.now(),
	query: query
}
ZiggeoSdk.Analytics.get (args, {
	success: function (data) {
		console.log (data);
	}
});