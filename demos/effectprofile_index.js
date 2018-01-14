var app_token = process.argv[2];
var app_private = process.argv[3];


var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, app_private);

var search_arguments = {
	limit: 50
};
ZiggeoSdk.EffectProfiles.index (search_arguments, function(effects){
	console.log(effects);
});
