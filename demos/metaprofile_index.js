
/*
	Usage: node metaprofile_index.js APP_TOKEN PRIVATE_KEY 
	Sample: node metaprofile_index.js 1234567890abcdef 1234567890abcdef
*/
var app_token = process.argv[2];
var private_key = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.MetaProfiles.index({
	limit: 100,
	skip: 0,
	reverse: false
}, {
	success: function(data){
		console.log(data);
	},
	failure: function(error){
		conosole.log(error);
	}
});