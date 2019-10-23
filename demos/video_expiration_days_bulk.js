/*
	Usage: node video_expiration_days_bulk.js APP_TOKEN PRIVATE_KEY "VIDEO1,VIDEO2,VIDEO3"  EXP_DAY_INT
*/

var app_token = process.argv[2];
var private_key = process.argv[3];
var video_tokens = process.argv[4];
var expiration_days = process.argv[5];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.Videos.update_bulk({tokens_or_keys:video_tokens,expiration_days: expiration_days},{
	success: function(data){
		console.log(data);
	},
	failure: function(error){
		console.log(error);
	}
});