ZiggeoSdk = require("../index.js");

ZiggeoSdk.init(process.argv[2], process.argv[3]);

ZiggeoSdk.Videos.index({}, {
	success: function (index) {
		for (var i = 0; i < index.length; ++i) {
			var video = index[i];
			console.log(video);
		}
	}
});
