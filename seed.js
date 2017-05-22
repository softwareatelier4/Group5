/**
* Standalond db seed
*/

var path = './frontend/src/claim-documents/';

var fs = require('fs');
var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

var seed = require('./test/seedDb').seed;

seed(function(err, seedData){
  deleteFolderRecursive(path);
  if (err) console.log(err);
  console.log("Seeding db complete!")
  process.exit();
})
