'use strict';
var express = require('express');
var path = require('path');

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// google image search data
var googleIms = require('google-ims');
let searchID = '018394045321279107056:ubskww0in80';
let apiKey = 'AIzaSyC_KNgL_v1834lScrW9kaf2dJRSymbnk24';
let client = googleIms(searchID, apiKey);

var app = express();

// this route allows custom pagination
app.get('/search/:terms' + '?offset=:num', function(req, res) {
  var terms = req.params.terms;
  var offsetNum = req.params.num;
  terms = terms.toString();
  
  logSearch(terms);
  
  client.search(terms, {
    page: offsetNum, // 10 results per page 
  }).then(function(images) {
    images.forEach(function(i, e, a) {
      res.json(images);
    });
  });
});

// search terms route
app.get('/search/:terms', function(req, res) {
  var terms = req.params.terms;
  terms = terms.toString();
  
  logSearch(terms);
  
  // once database work is done, we search!
  client.search(terms, {
    page: 2, // 10 results per page 
  }).then(function(images) {
    images.forEach(function(i, e, a) {
      res.json(images);
    });
  });
});


app.get('/search', function(req, res, next) {
  res.setHeader('content-type', 'text/plain');
  res.send("please include search terms at the end of the route (i.e. '/search/<terms>')");
});


app.get('/latest', function(req, res, next) {
  MongoClient.connect("mongodb://client_user:client_password@ds143071.mlab.com:43071/image-search-abstraction-layer", function(err, db) {
    if (!err) {
      db.collection('searches').find({}, { _id: 0 }).toArray(function(err, searches) {
        
        if (err) throw err;

        // so now, we can return all searches to the screen.
        res.status(200).json({
          'recent searches': searches
        });
      });
    }
  });
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('app listening on port ' + process.env.PORT + '!');
});



function logSearch(searchTerms){
  
  let mongoose = require('mongoose');
  let schema = require('./schema');
  
  // instantiate mongoose model inside function
  let Search = mongoose.model('Search', schema, 'searches');
  
  // create date object
  let time = new Date();
  time = time.toISOString();
  // create search instance to be inserted into collection
  let search = new Search({
    term: searchTerms,
    when: time
  });

  // Connect to the db
  MongoClient.connect("mongodb://client_user:client_password@ds143071.mlab.com:43071/image-search-abstraction-layer", function(err, db) {
  if (!err) {
       
    // create searches collection as soon as first document is inserted
    db.collection('searches', function(err, collection) {if (err) throw err});

    // insert search instance into database, then close database
    db.collection('searches').insertOne(search);
    
  }
  });
}


module.exports = server;