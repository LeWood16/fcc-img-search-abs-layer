'use strict';
var express = require('express');
var path = require('path');
var imgSearch = require('node-google-image-search');

var app = express();


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/search', function(req,res){
  res.status(200).json({ name: 'search route' });
});

app.get('/search/*', function(req, res, next) {
    res.json({
        error: "please enter a valid URL using the '/new/<url>' format",
    });
    next(); 
});





/*
app.get('/new/*', function(req, res, next) {
// regex to catch url format; if anything entered after 'new/' matches, shorten it;
var urlRegex =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (urlRegex.test(req.param(0))){

    // Shorten a long url and send the shortened version via res.json
    googl.shorten(req.param(0))
      .then(function (shortUrl) {
        res.json({
          original_url: req.param(0),
          short_url: shortUrl
        });
      })
      .catch(function (err) {
        console.error(err.message);
      });
    
   } else {
    res.json({
        error: "wrong format; make sure you're using a real site and proper format (e.g. 'https://www.foo.bar').",
    }); 
  }
});

app.get('/*', function(req, res, next) {
    res.json({
        error: "either not a URL or not using the '/new/<url>' format",
    });
    next();  
});



*/

app.listen(process.env.PORT || 3000, function(){
  console.log('app listening on port ' + process.env.PORT + '!');
});
