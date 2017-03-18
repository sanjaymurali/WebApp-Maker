var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./assignment/dbconnection/connection")(app);

var port = process.env.PORT || 3000;

//var apiRouter = require('express').Router();

require("./assignment/app.js")(app);

//app.use('/makerapi', webappmaker);


//Used to setup the client
app.use('/js', express.static(__dirname + '/public/assignment/js'));
app.use('/css', express.static(__dirname + '/public/assignment/css'));
app.use('/views', express.static(__dirname + '/public/assignment/views'));


app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', {root: 'public/assignment'});
});

app.listen(port);