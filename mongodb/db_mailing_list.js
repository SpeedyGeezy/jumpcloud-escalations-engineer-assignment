// Search for only emails of all Patrons

// Setting mongodb as client
var MongoClient = require('mongodb').MongoClient;
// Setting local connection to mongodb
var url = "mongodb://127.0.0.1:27017/";


// Connect function to MongoDB client - which then passes url in as a parameter - then runs subsequent function
// dbo set as variable to refer to Brewery Database
// Query set a variable - this use case for all emails
// Filter set as variable - this use case to only return email and remove _id from collection
// Query Patrons collection using variables
// Return results
// Close
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("brewery");
  var query = { email: /.m./ };
  var filter = {email: 1, _id: 0};
  dbo.collection("patrons").find(query).project(filter).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
