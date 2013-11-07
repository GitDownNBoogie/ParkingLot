var lastMessage;
window.onload = function(){

    var ws = new WebSocket('ws://localhost:3000');
    ws.onopen = function(){
        ping();
    }

    ws.onmessage = function(ev){
        document.getElementById('latency').innerHTML = new Date - lastMessage
        ping();
    }

    function ping(){
        lastMessage = +new Date;
        ws.send('ping');
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

    document.getElementById("longHistory").onclick = function(){

        setSlowRspMsgStart();
        var messages = 1;
        var ws = new WebSocket('ws://localhost:3000');

        continuePinging = function(){
            ws.send('slowPing');
        }

        ws.onopen = function(){
            continuePinging();
        }

        ws.onmessage = function(ev){

            messages+=1;
            if(messages == 10000){
                setSlowRspMsgMid();
                continuePinging();
            }
            else if(messages == 20000){
                setSlowRspMsgEnd();
            }
            else{
                continuePinging();
            }
        }
    }
}