var lastMessage;
window.onload = function(){

    var mainSocket = new WebSocket('ws://localhost:3000');

    function ping(){
        lastMessage = +new Date;
        mainSocket.send('ping');
    }

    mainSocket.onopen = function(){
        ping();
    }

    mainSocket.onmessage = function(){
        document.getElementById('latency').innerHTML = new Date - lastMessage
        ping();
    }

    document.getElementById("longHistory").onclick = function(){

        setSlowRspMsgStart();

        var slowResponseSocket = new WebSocket('ws://localhost:3000');

        slowResponseSocket.onopen = function(){
            slowResponseSocket.send('slowPing');
        }

        slowResponseSocket.onmessage = function(ev){

            console.log("Message: " + ev);

            setTimeout(function(){
                setSlowRspMsgMid();
            },5000);

            setTimeout(function(){

                setSlowRspMsgEnd();
            },10000);
        }
    }

    function setSlowRspMsgStart(){
        document.getElementById("longResponse").innerHTML = "waiting..."
    }

    function setSlowRspMsgMid(){
        document.getElementById("longResponse").innerHTML = "please be patient..."
    }

    function setSlowRspMsgEnd(){
        var html = "<select id='longHistoryOptions'><option value='waitMore'>Wait More</option><option value='result'>Result</option></select>";
        document.getElementById("longResponse").innerHTML = "Done! " + html;
    }
}