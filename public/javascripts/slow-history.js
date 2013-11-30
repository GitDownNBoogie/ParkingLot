var WAIT_SECOND_EVENT = 5000;
var WAIT_THIRD_EVENT = 10000;

document.getElementById("longHistory").onclick = function(){

    setSlowRspMsgStart();

    setTimeout(function(){
        setSlowRspMsgMid();
    },WAIT_SECOND_EVENT);

    setTimeout(function(){

        setSlowRspMsgEnd();
    },WAIT_THIRD_EVENT);
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
