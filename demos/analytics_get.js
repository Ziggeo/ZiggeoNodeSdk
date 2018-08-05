
/*
	Usage: node analytics_get.js APP_TOKEN PRIVATE_KEY QUERY
	Sample: node analytics_get.js 1234567890abcdef 1234567890abcdef device_views_by_os
*/
var app_token = process.argv[2];
var app_private = process.argv[3];
var query = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, app_private);
var date = new Date().getTime()
// get all data from the beginning 
var options ={
	from: 0,
	to: Date.now(),
	query: query
}
ZiggeoSdk.Analytics.get (options, {
	success: function (video) {
		console.log (video);
	}
});
