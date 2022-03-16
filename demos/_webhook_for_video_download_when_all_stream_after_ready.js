/*
	This will download any created video that "ready"

	install express.js first by using:
	npm install --save express body-parser
	
	on your ziggeo application setting, on the webhook
	pick "JSON encoding" when adding new webhook url for this file
*/
// initialize Ziggeo
const app_token = "APP_TOKEN";
const private_key = "PRIVATE_KEY";
const Ziggeo = require("../index.js");
const ZiggeoSdk = new Ziggeo(app_token, private_key);
var fs = require('fs');

// initialize express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const jsonParser = bodyParser.json()

app.post('/webhook', jsonParser, (req, res) => {
	// return status 200 because it is a proper reply
	res.status(200)
	res.send()

	var event_type = req.body.event_type;
	if(event_type === 'video_streams_ready') {
		var video_token = req.body.data.video.token;
		ZiggeoSdk.Videos.get (video_token, {
			success: function (video) {
				for(var i = 0; i < video.streams.length; i++) {
					var stream_token = video.streams[i].token;
					downloadVideo(video_token, stream_token, video.streams[i].video_type);
				}
			}
		});
	}
})

function downloadVideo(video_token, stream_token, video_type) {
	ZiggeoSdk.Streams.download_image(video_token, stream_token, {
		success: function (data) {
			fs.writeFileSync(video_token + '_' + stream_token + '.' + video_type, Buffer.from(data, "binary"));
		}
	});
}

app.listen(8080, ()=> {
	console.log("ready on port 8080");
})