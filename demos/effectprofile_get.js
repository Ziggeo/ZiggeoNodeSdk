ZiggeoSdk = require("../index.js");
var app_token = process.argv[2];
var app_private = process.argv[3];
var effectprofile_token = process.argv[4];

ZiggeoSdk.init (app_token, app_private);

ZiggeoSdk.EffectProfiles.get (effectprofile_token, function(effects){
	console.log(effects);
});
