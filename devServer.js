var config = require('./public/config.js');
var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('config.json'));

app.get('/config', function (req, res) {
    res.json(config)
});

app.listen(8081, function () {
    console.log('noe4Story is ready on port 8081!');
});