ZiggeoSdk = require("../index.js");

var app_token = process.argv[2];
var private_key = process.argv[3];
var encryption_key = process.argv[4];

ZiggeoSdk.init(app_token, private_key, encryption_key);

// you can find example of grants JSON at https://ziggeo.com/docs/api/authorization-tokens/examples
var grants = {
        "create": {
            "session_owned": true
        },
        "destroy": {
            "session_owned": true
        }
    };
var token_arguments = {
    grants: JSON.stringify(grants),
    session_limit: 1,
    volatile: true
};
ZiggeoSdk.Authtokens.create(token_arguments, {
    success: function (data) {
        console.log(data);
    }
});