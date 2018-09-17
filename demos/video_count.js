var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(process.argv[2], process.argv[3]);

ZiggeoSdk.Videos.count({}, {
	success: function (count) {
		console.log(count.count);
	},
	failure: function (args, error) {
		console.log(error);
	}
});