var app_token = process.argv[2];
var private_key = process.argv[3];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);
var application_args = {
	name: "Test Name", // change name of the Application
	auth_token_required_for_create: true // set option to require auth token when creating new video.
}
ZiggeoSdk.Application.update(application_args, {
	success: function(data){
		console.log(data);
	},
	failure: function(data){
		console.log(data);
	}
});