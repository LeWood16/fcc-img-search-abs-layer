'use strict';
var express = require('express');
var path = require('path');
var accountKey = 'npCUoIflwPpdgKb1AC67R9K9LpY8N8+beWni+8T85QE';
var Bing = require('node-bing-api')({ accKey: accountKey });


var app = express();


app.get('/search/:terms', function(req, res, next) {
  var terms = req.params;
  res.send(terms);
});


app.get('/search', function(req, res, next){
  Bing.images("Ninja Turtles", {
  top: 15,   // Number of results (max 50) 
  skip: 3    // Skip first 3 result 
  }, function(error, res, body){
    console.log(body);
  }), next();
  res.send('search successful');
  
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('app listening on port ' + process.env.PORT + '!');
});

module.exports = server;

