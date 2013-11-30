window.onload = function(){

    var socket = io.connect("http://localhost:3000");

    socket.on('response', function(response){

        console.log("Socket got a response: " + response);
    });

    socket.emit('message', "Hello");
}