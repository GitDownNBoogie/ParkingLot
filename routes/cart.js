var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('cartdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'cartdb' database");
        db.collection('cart', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'cart' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
            else{
              console.log("No errors detected connecting to 'cart' collection");
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving cart item: ' + id);
    db.collection('cart', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('cart', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addToCart = function(req, res) {
    var cartItem = req.body;
    console.log('Adding to cart: ' + JSON.stringify(cartItem));
    db.collection('cart', function(err, collection) {
        collection.insert(cart, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateCart = function(req, res) {
    var id = req.params.id;
    var cartItem = req.body;
    delete cartItem._id;
    console.log('Updating cartItem: ' + id);
    console.log(JSON.stringify(cartItem));
    db.collection('cart', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, cartItem, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating cartItem: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(cartItem);
            }
        });
    });
};

exports.removeFromCart = function(req, res) {
    var id = req.params.id;
    console.log('Removing from cart: ' + id);
    db.collection('cart', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var cartItems = [
        {
            type: "dining",
            item: "Dinner for two at Pirate's Cave",
            price: "$65"
        },
        {
            type: "spa",
            item: "Mani/pedi at Octomom Salon",
            price: "$35"
        },
        {
            type: "gift",
            item: "Basket of natural ocean plastic",
            price: "$105"
        }];

    db.collection('cart', function(err, collection) {
        collection.insert(cartItems, {safe:true}, function(err, result) {
            if(err){
                console.log("Error populating cart: ", err);
            }
        });
    });

};