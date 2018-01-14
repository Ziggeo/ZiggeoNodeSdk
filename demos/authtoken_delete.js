var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(process.argv[2], process.argv[3]);

var token = process.argv[4];

//You can see bellow how the data needs to be specified. You can hard code it, calculate it based on parameter sent, or send directly, which would be up to you. For simplicity we are hardcoding the same as shown bellow and passing it like that to the update function.

//var updateArguments = process.argv[6];


ZiggeoSdk.Authtokens.destroy(token, {
    success: function (result) {
        console.log(result);
    }
});