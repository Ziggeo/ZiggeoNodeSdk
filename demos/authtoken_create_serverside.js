var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(process.argv[2], process.argv[3], process.argv[4]);

var token = process.argv[5];

// You can send the data you wish to use in the token as parameter, or create it based on the parameter sent in, or simply hardcode the value into the code, that is all up to you. For simplicity we are hardcoding a value.

//var data = process.argv[6];

const data = {
    session_limit: 200
};

ZiggeoSdk.Authtokens.create(data, {
    success: function (result) {
        console.log(result);
    }
});
