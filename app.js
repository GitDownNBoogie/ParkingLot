/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    socketIo = require('socket.io'),
    cart = require('./routes/cart');


var exprs = express();

exprs.use(express.logger('dev'));

exprs.set('port', process.env.PORT || 3000);
exprs.set('views', __dirname + '/views');
exprs.set('view engine', 'jade');
exprs.use(express.favicon());
exprs.use(express.bodyParser());
exprs.use(express.methodOverride());
exprs.use(exprs.router);
exprs.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == exprs.get('env')) {
    exprs.use(express.errorHandler());
}

exprs.get('/', routes.index);
exprs.get('/jade-sandbox', routes.jade_sandbox);
exprs.get('/js-sandbox', routes.js_sandbox);
exprs.post('/history', function (req, res) {
    res.render('history', { title:'Parking Lot: History', description:'Parking Lot: History.'});
});
exprs.get('/cart', cart.findAll);
exprs.get('/cart/:id', cart.findById);
exprs.post('/cart', cart.addToCart);
exprs.put('/cart/:id', cart.updateCart);
exprs.delete('/cart/:id', cart.removeFromCart);

var app = http.createServer(exprs);
var io = socketIo.listen(app);

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


