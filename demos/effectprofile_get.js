ZiggeoSdk = require("../index.js");
var app_token = process.argv[2];
var app_private = process.argv[3];
var effectprofile_token = process.argv[5];

ZiggeoSdk.init (app_token, app_private);
var search_arguments = {
	limit: 50
}
ZiggeoSdk.EffectProfiles.get (search_arguments, function(effects){
	console.log(effects);
});
