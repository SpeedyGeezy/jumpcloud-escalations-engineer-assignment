// Groups for beer name and type with quantity ordered


// Setting mongodb as client
var MongoClient = require('mongodb').MongoClient;
// Setting local connection to mongodb
var url = "mongodb://127.0.0.1:27017/";



// Connect function to MongoDB client - which then passes url in as a parameter - then runs subsequent function
// dbo set as variable to refer to Brewery Database
// Query set as variable where the lookup action joins the Beers collection - using Drinks as a new field to merge data from the pre-specified fields
// Query variable includes count of quantity of beer and type ordered
// Query is then aggregated from Patrons Collection
// Results returned
// Close

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("brewery");
  var query = [ {$lookup: {from:"beers", localField: "favorite_beer", foreignField:"_id", as: "Drinks"}}, {$unwind: "$Drinks"}, {$group: {_id: "$Drinks.name", type: {$first: "$Drinks.type"}, count: {$sum: 1}}} ];
  var filter = {};
  dbo.collection("patrons").aggregate(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
