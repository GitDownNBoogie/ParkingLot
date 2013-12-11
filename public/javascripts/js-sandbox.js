//Arbitrary javascript functions serving no purpose other than to experiment with features of javascript.


/*******************************************************************
 Callback Hell - Lots of callbacks in progress
 TODO: Get some http calls and functional dependencies in here
 *******************************************************************/

// assign functions and variables to vars to avoid polluting the global scope
var message = "Call me back!";

// simple pass-through callback
var passThroughCallback = function (callback) {

  return callback(message);
};

// logs to console
var consoleMessage = function (msg) {

  console.log(msg);
};

// increments the value and passes it into the callback given
var increment = function (val, callback) {

  callback("Your new number is: " + val++);
};

// increments the value, passes the console call to the given callback
var incrementAndCallback = function (val, callback) {

  increment(val, consoleMessage);

  callback(function(){
    consoleMessage(message)
  });
};

incrementAndCallback(5, passThroughCallback);

