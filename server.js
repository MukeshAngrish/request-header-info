// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  //"ipaddress":"159.20.14.100", 
  //"language":"en-US,en;q=0.5", 
  //"software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
  var ipaddress = req.headers['x-forwarded-for'];
  var language = req.headers['accept-language'];
  var software = req.headers['user-agent'];
  
  res.json({
    ipaddress: ipaddress.substr(0, ipaddress.indexOf(',')),
    language: language.substr(0, language.indexOf(';')),
    software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
