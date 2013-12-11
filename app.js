/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    sio = require('socket.io'),
    mongoClient = require('mongodb').MongoClient;

/*
 mongoClient.connect('mongodb://localhost:27017/parking-lot', function(err, db){

 "use strict";
 if(err) throw err;
 */

var exprs = express();

// all environments
exprs.set('port', process.env.PORT || 3000);
exprs.set('views', __dirname + '/views');
exprs.set('view engine', 'jade');
exprs.use(express.favicon());
exprs.use(express.logger('dev'));
exprs.use(express.bodyParser());
exprs.use(express.methodOverride());
exprs.use(exprs.router);
exprs.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == exprs.get('env')) {
    exprs.use(express.errorHandler());
}

exprs.get('/', routes.index);
exprs.get('/pricing', routes.pricing);
exprs.get('/js-sandbox', routes.js_sandbox);
exprs.post('/history', function (req, res) {

    res.render('history', { title:'Parking Lot: History', description:'Parking Lot: History.'});
});

var app = http.createServer(exprs);
var io = sio.listen(app);

io.sockets.on('connection', function (socket) {

    console.log("Somebody connected via websocket");

    socket.on('message', function (msg) {

        console.log("Received message: " + msg);
        socket.emit('response', 'world');
    });
});

app.listen(exprs.get('port'), function () {
    console.log('Express server listening on port ' + exprs.get('port'));
});
//});


