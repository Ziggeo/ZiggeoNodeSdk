ZiggeoSdk = require("../index.js");
var fs = require('fs');
var app_token = process.argv[2];
var private_key = process.argv[3];
var video_token = process.argv[4];

ZiggeoSdk.init(app_token, private_key);

// you can find example of grants JSON at https://ziggeo.com/docs/api/authorization-tokens/examples

ZiggeoSdk.Videos.download_video(video_token, function(data){
    fs.writeFile('test.webm', data, function(err){
        
    });
    // console.log(data);
});