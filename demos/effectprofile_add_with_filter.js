var app_token = process.argv[2];
var private_key = process.argv[3];
var effect_profile_title = process.argv[4];
var effect_profile_key = process.argv[5];
var filter_effect = process.argv[6]; // filtes are gray, cartoon, lucis, edge, chill, charcoal, sketch

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

var args = {
	title: effect_profile_title,
	key: effect_profile_key
};
ZiggeoSdk.EffectProfiles.create(args ,function(data){
	var profile_token = data.token;
	var filterArgs = {
		filter: filter_effect
	};
	ZiggeoSdk.EffectProfileProcess.create_filter_process(profile_token, filterArgs, function(data){
		console.log(data);
	});
});