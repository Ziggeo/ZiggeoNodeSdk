/*
	This file shows you how to get stats about some specific application within your account

	Required parameters:
	1. app_token
	2. private_key
*/
var app_token = process.argv[2];
var private_key = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Application.get_stats({}, {
	success: function (stats) {
		console.log(stats);
	},
	failure: function (args, error) {
		console.log(error);
	}
});