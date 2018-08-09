
/*
	This will create new metaprofile with nsfw process
	Usage: node metaprofile_create_with_nsfw.js APP_TOKEN PRIVATE_KEY METAPROFILE_TITLE
	Sample: node metaprofile_create_with_nsfw.js 1234567890abcdef 1234567890abcdef sample_metaprofile
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
		metaprofile_token = data.token;
		// create nsfw process and `reject` as the action whenever the nsfw found
		ZiggeoSdk.MetaProfileProcess.create_nsfw_process(metaprofile_token, {nsfw_action: 'reject'}, {
			success: function(data){
				console.log(data)
			}
		})
	},
	failure: function(error){
		console.log(error);
	}
});