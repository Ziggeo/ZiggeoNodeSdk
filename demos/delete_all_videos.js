ZiggeoSdk = require("../index.js");

ZiggeoSdk.init(process.argv[2], process.argv[3]);

ZiggeoSdk.Videos.index({}, {
	success: function (index) {
		var video_counter = 0;
		console.log ('Starting to delete '+index.length+' videos.');
		for (var i = 0; i < index.length; ++i) {
			var video = index[i];
			ZiggeoSdk.Videos.destroy(video.token,{
				success: function (result) {
					// to show progress on the console until it's done.
					video_counter += 1;
					console.log('Deleted video '+video_counter+' of '+index.length+' videos.');
					if (video_counter == index.length) {
						console.log ('Deletion of all videos is completed.');
					}
				}
			});
		}
	}
});
