ZiggeoSdk = require("../index.js");

ZiggeoSdk.init(process.argv[2], process.argv[3], process.argv[4]);

var token = process.argv[5];

ZiggeoSdk.Authtokens.get(token, {
    success: function (result) {
        console.log(result);
    }
});

