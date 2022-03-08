/*
	install express.js first by using:
	npm install --save express body-parser
	
	on your ziggeo application setting, on the webhook
	pick "JSON encoding" when adding new webhook url for this file
*/
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


var jsonParser = bodyParser.json()
app.post('/webhook', jsonParser, (req, res) => {
	// return status 200 because it is a proper reply
	res.status(200)
	res.send()
	// print the data
	console.log(req.body.data)
})

app.listen(8080, ()=>{
	console.log("ready on port 8080");
})