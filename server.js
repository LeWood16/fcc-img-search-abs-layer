'use strict';
var express = require('express');
var path = require('path');
var GoogleImages = require('google-images');

const CSE_ID = '018394045321279107056:cppxvao4_ya';
const CSE_API_KEY = 'AIzaSyBbWwyIkfHUmUpSqpaDUHs_xWK5c8NlSd4';

var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get(/a/, function (req, res) {
  // res.setHeader('content-type', 'plain/text');
  var foo = {bar: "bar", baz: "baz"};
  res.json(foo);
});

app.get('/search', function(req,res){
  res.send('search route');
});



app.get('/search/*', function(req, res, next) {

//  res.setHeader('content-type', 'text/plain');
  var type = typeof(res);
  var reqParams = req.params;
  res.json(req.params);
});


app.get('/latest', function(req,res){
  res.status(200).json({ name: 'latest route' });
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('app listening on port ' + process.env.PORT + '!');
});

module.exports = server;

