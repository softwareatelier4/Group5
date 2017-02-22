/** 
* Standalond db seed
*/
var seed = require('./test/seedDb').seed;

seed(function(err, seedData){
  if (err) console.log(err);
  console.log("Seeding db complete!")
  process.exit();
})