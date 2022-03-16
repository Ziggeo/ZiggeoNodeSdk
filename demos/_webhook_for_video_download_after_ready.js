/*
	This will download any created video that has "ready" status

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
	if(event_type === 'video_ready') {
		var video_token = req.body.data.video.token;
		ZiggeoSdk.Videos.download_video(video_token, {
			success: function (data) {
				fs.writeFileSync(video_token + '.mp4', Buffer.from(data, "binary"));
			}
		});
	}
})

app.listen(8080, ()=> {
	console.log("ready on port 8080");
})