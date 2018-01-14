var fs = require('fs');
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

// you can find example of grants JSON at https://ziggeo.com/docs/api/authorization-tokens/examples
ZiggeoSdk.Videos.get (video_token, {
    success: function (video) {
        downloadVideo(video);
    }
});
function downloadVideo(video){
    ZiggeoSdk.Streams.download_video(video.token, video.default_stream.token, function(data){
        fs.writeFile(video.token+'.'+video.default_stream.video_type, data, function(err){
            console.log('downloaded\n');
        });
    });
}
