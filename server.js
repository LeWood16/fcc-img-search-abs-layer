'use strict';
var express = require('express');
var path = require('path');

var app = express();


app.get('/search/*', function(req, res, next) {
  res.setHeader('content-type', 'plain/text');
  // var type = typeof(res);
  // var reqParams = req.params;
  res.send('foo');
});
app.get('/search', function(req,res){
  res.send('search route');
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('app listening on port ' + process.env.PORT + '!');
});

module.exports = server;

