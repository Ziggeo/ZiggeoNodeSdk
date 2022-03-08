/*
	This file shows you how to create client side auth tokens

	Required parameters:
	1. app_token
	2. private_key
	3. auth_token
*/

var app_token = process.argv[2];
var private_key = process.argv[3];
var encryption_key = process.argv[4];

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key, encryption_key);

// you can find example of grants JSON at https://ziggeo.com/docs/api/authorization-tokens/examples
var grants = {
	"create": {
		"session_owned": true
	},
	"destroy": {
		"session_owned": true
	}
};

var args = {
	grants: JSON.stringify(grants),
	session_limit: 1,
	volatile: true
};

console.log(ZiggeoSdk.Auth.generate(args));