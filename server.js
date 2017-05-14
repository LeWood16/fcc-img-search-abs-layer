'use strict';
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var schema = require('./schema');

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var Search = mongoose.model('Search', schema, 'test');





var googleIms = require('google-ims');
let searchID = '018394045321279107056:ubskww0in80';
let apiKey = 'AIzaSyC_KNgL_v1834lScrW9kaf2dJRSymbnk24';
let client = googleIms(searchID, apiKey);

var app = express();


// IMPORTANT: make db insertion into function, then insert into both
// default pagination and custom pagination routes, to keep your app DRY

// this route allows custom pagination
app.get('/search/:terms' + '?offset=:num', function(req, res){
  var terms = req.params.terms;
  var offsetNum = req.params.num;
  terms = terms.toString();
  client.search(terms, {
    page: offsetNum, // 10 results per page 
}).then(function (images) {
    images.forEach(function(i, e, a) {
        res.json(images);
    });
});
});

// search terms route
app.get('/search/:terms', function(req, res){
  var terms = req.params.terms;
  terms = terms.toString();
  
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  if(!err) {
    
    // create searches collection if it doesn't exist already
    db.createCollection('searches', {strict:true}, function(err, collection) {});
    console.log("searches collection created!");
    
    // create model instance for db insertion
    var search = new Search({
      term: terms,
      when: Date.now()
    });
    
    // insert search instance into database, then close database
    db.collection.insert(search);
  
    db.close();
  
  
  // once database work is done, we search!
  client.search(terms, {
    page: 2, // 10 results per page 
}).then(function (images) {
    images.forEach(function(i, e, a) {
        res.json(images);
    });
});


app.get('/search', function(req, res, next) {
res.setHeader('content-type', 'text/plain');
res.send("please include search terms at the end of the route (i.e. '/search/<terms>')");
});


app.get('/latest', function(req, res, next) {
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  if(!err) {
    
    // create searches collection if it doesn't exist already
    db.createCollection('searches', {strict:true}, function(err, collection) {});
    console.log("searches collection created!");
    
    // create model instance for db insertion
    var search = new Search({
      term: "test term",
      when: Date.now()
    });
    db.collection.insert(search);

    var history = db.collection('searches').find({});
    res.send(history);
  }
});



});









app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('app listening on port ' + process.env.PORT + '!');
});

module.exports = server;

