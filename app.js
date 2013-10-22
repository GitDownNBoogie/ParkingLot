
/**
 * Module dependencies.
 */

var express = require('express'),
routes = require('./routes'),
http = require('http'),
path = require('path'),
wsio = require('websocket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/pricing', routes.pricing);
app.post('/history', function(req, res){

        res.render('history', { title: 'Parking Lot: History', description: 'Parking Lot: History.'});
});

var server = http.createServer(app);
var ws = wsio.attach(server);

ws.on('connection', function(socket){

    socket.on('message', function(msg){

        var rsp = 'pong';
        socket.send(rsp);
    });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
