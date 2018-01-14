var fs = require('fs');
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];
var stream_token = process.argv[5];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

// you can find example of grants JSON at https://ziggeo.com/docs/api/authorization-tokens/examples
ZiggeoSdk.Streams.get (video_token, stream_token, {
    success: function (stream) {
    	console.log(stream);
        ZiggeoSdk.Streams.download_video (video_token, stream_token, function(data){
	    	console.log('download');
	        fs.writeFile(video_token+'_'+stream_token+'.'+stream.video_type, data, function(err){
	            console.log('downloaded\n');
	        });
	    });
    }
});