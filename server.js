var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var app = express();

app.use(require('express-favicon-short-circuit'));

app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({
    secret: process.env.SESSION_SECRET || "bigsecretlocal123!",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./assignment/dbconnection/connection")(app);

var port = process.env.PORT || 3000;

//var apiRouter = require('express').Router();

require("./assignment/app.js")(app);

//app.use('/makerapi', webappmaker);


//Used to setup the client
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/views', express.static(__dirname + '/public/views'));


app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port);