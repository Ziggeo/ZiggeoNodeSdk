var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(process.argv[2], process.argv[3]);

ZiggeoSdk.Application.get_stats({}, {
	success: function (stats) {
		console.log(stats);
	},
	failure: function (args, error) {
		console.log(error);
	}
});