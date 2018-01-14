var app_token = process.argv[2];
var private_key = process.argv[3];
var effect_profile_title = process.argv[4];
var effect_profile_key = process.argv[5];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var args = {
	title: effect_profile_title,
	key: effect_profile_key
};
ZiggeoSdk.EffectProfiles.create(args ,function(data){
	console.log(data);
});