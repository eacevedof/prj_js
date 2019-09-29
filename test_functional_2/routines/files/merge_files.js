//http://www.yaoyuyang.com/2017/01/20/nodejs-batch-file-processing.html
var fs = require('fs');

// make Promise version of fs.readdir()
fs.readdirAsync = function(dirname) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames){
            if (err) 
                reject(err); 
            else 
                resolve(filenames);
        });
    });
};

// make Promise version of fs.readFile()
fs.readFileAsync = function(filename, enc) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

// utility function, return Promise
function getFile(filename) {
    return fs.readFileAsync(filename, 'utf8');
}

// example of using promised version of getFile
// getFile('./fish1.json', 'utf8').then(function (data){
// console.log(data);
// });


// a function specific to my project to filter out the files I need to read and process, you can pretty much ignore or write your own filter function.
function isDataFile(filename) {
  return (filename.split('.')[1] == 'json' 
          && filename.split('.')[0] != 'fishes'
          && filename.split('.')[0] != 'fishes_backup')
}

// start a blank fishes.json file
fs.writeFile('./fishes.json', '', function(){console.log('done')});


// read all json files in the directory, filter out those needed to process, and using Promise.all to time when all async readFiles has completed. 
fs.readdirAsync('./').then(function (filenames){
    filenames = filenames.filter(isDataFile);
    console.log(filenames);
    return Promise.all(filenames.map(getFile));
}).then(function (files){
    var summaryFiles = [];
    files.forEach(function(file) {
      var json_file = JSON.parse(file);
      summaryFiles.push({ "name": json_file["name"],
                          "imageUrl": json_file["images"][0],
                          "id": json_file["id"]
                      });
    });
    fs.appendFile("./fishes.json", JSON.stringify(summaryFiles, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was appended!");
    });
});
