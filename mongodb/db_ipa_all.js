// Search for BOTH IPAs and Hazy IPAs

// Setting mongodb as client
var MongoClient = require('mongodb').MongoClient;
// Setting local connection to mongodb
var url = "mongodb://127.0.0.1:27017/";
// Setting mongodb as reference for the subsequent beer types - IPA and Hazy IPA
var ObjectID = require('mongodb').ObjectID
var obj = ObjectID('6070941a92f3b0eaf535a86b')
var obj2 = ObjectID('6070941a92f3b0eaf535a86c')


// Connect function to MongoDB client - which then passes url in as a parameter - then runs subsequent function
// dbo set as variable to refer to Brewery Database
// Query set as variable for either ObjectIDs of the predefined beer types
// Filter set as variable to include email and remove _id
// Patrons collection used as reference to query variables
// Return Results
// Close

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("brewery");
  var query = {$or: [{ "favorite_beer":obj}, {"favorite_beer":obj2}]};
  var filter = {email: 1, _id: 0};
  dbo.collection("patrons").find(query).project(filter).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
