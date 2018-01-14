
var fs = require("fs");

var app_token = process.argv[2];
var private_key = process.argv[3];
var folder_name = process.argv[4];
var tags = process.argv[5];
var ignore_list = ".,.."; // don't try to upload . and ..
var file_list = [];

if(tags === undefined || tags === ''){
	tags = 'NodeBulkImport';
}

if(folder_name.slice(-1) !== '/'){
	folder_name = folder_name+'/';
}

var Ziggeo = require("../index.js");
var ZiggeoSdk = new Ziggeo(app_token, private_key);

fs.readdirSync (folder_name).forEach(file => {
  file_list.push(file);
});
uploadSingleFile();

function uploadSingleFile(){
	if(file_list.length == 0){
		return;
	}
	var file_to_upload = file_list.shift();
	ZiggeoSdk.Videos.create({
		file: folder_name+file_to_upload
	}, function(data){
		uploadSingleFile();
	});
}