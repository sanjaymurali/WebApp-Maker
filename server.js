var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

/* Used to setup the client */
app.use('/js', express.static(__dirname + '/public/assignment/js'));
app.use('/css', express.static(__dirname + '/public/assignment/css'));


app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', {root: 'public/assignment'});
});

app.listen(port);