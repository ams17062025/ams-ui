
var messageTimeOut = 1300;

export function processSuccessMessage(message) {
    var el = document.getElementById("myPopup");
    el.style.display = 'block';
    el.style.backgroundColor = "green";
    var elText = document.getElementById("messageContent");
    elText.innerHTML = message;
    setTimeout(timeOutFunction, messageTimeOut);
}

export function processErronMessage(message) {
    var el = document.getElementById("myPopup");
    el.style.display = 'block';
    el.style.backgroundColor = "red";
    var elText = document.getElementById("messageContent");
    elText.innerHTML = message;
    setTimeout(timeOutFunction, messageTimeOut);
}
function timeOutFunction(){
     var el = document.getElementById("myPopup");
    el.style.display = 'none';
}