// Count of patrons visting between 01-01 and 04-01


// Setting mongodb as client
var MongoClient = require('mongodb').MongoClient;
// Setting local connection to mongodb
var url = "mongodb://127.0.0.1:27017/";


// Connect function to MongoDB client - which then passes url in as a parameter - then runs subsequent function
// dbo set as variable to refer to Brewery Database
// Query set as variable to match results from within specified time and date ranges and also grouped
// Query is aggregated from the Patrons collection
// Results are returned
// Close

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("brewery");
  var query = [ {$match: {"last_checkin": {"$gte": new Date("2021-01-01T00:00:00Z"), "$lt": new Date("2021-04-01T00:00:00Z")}}}, {$group: {_id: "$location", count: {$sum: 1}}} ];
  var filter = {};
  dbo.collection("patrons").aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
