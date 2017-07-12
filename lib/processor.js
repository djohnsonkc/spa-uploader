let busboy = require('connect-busboy')
let fs = require('fs');


exports.upload = function(req, callback) {

	let count = 0;

	req.pipe(req.busboy);
    // req.busboy.on('file', function(fieldname, file, filename) {
    //     let fstream = fs.createWriteStream('./_uploads/' + filename); 
    //     file.pipe(fstream);
    //     fstream.on('close', function () {
    //     	processFile(filename, function(err, results) {

    //         	callback(null, { status: 200, successful: true, message: "File uploaded successfully."})
 
    //     	})
    //    });
    // });
	req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

		count++

		//console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
		let data = ''
		file.on('data', function(chunk) {
			data+=chunk
			//console.log('File [' + fieldname + '] got ' + chunk.length + ' bytes');
		});
		file.on('end', function() {
			//callback(null, data)
		});
	});

    req.busboy.on('finish', function() {
      console.log('Done processing file(s)!');


      callback(null, { file_count: count })

    });

}

