
/*
	Usage: node metaprofile_create.js APP_TOKEN PRIVATE_KEY METAPROFILE_TITLE
	Sample: node metaprofile_create.js 1234567890abcdef 1234567890abcdef sample_metaprofile
*/
var app_token = process.argv[2];
var private_key = process.argv[3];
var title = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

ZiggeoSdk.MetaProfiles.create({
	title: title
}, {
	success: function(data){
		console.log(data);
	},
	failure: function(error){
		conosole.log(error);
	}
});