
export async function getCall(url, requestParam) {
    const res = await fetch(url);
    if (!res.ok) {
        processErronMessage("Error in process the request");
    }
    return res.json();
}

export async function postCall(url, requestBody) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
    });
    if (!res.ok) {
        processErronMessage("Error in process the request");
    }
    return res.json();
}

export async function deleteCall(url, requestBody) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
    });
    if (!res.ok) {
        processErronMessage("Error in process the request");
    }
    return res.json();
}

function processErronMessage(message) {
    var el = document.getElementById("myPopup");
    el.style.display = 'block';
    el.style.backgroundColor = "red";
    var elText = document.getElementById("messageContent");
    elText.innerHTML = message;
    setTimeout(timeOutFunction, 2000);
}
function timeOutFunction(){
    var el = document.getElementById("myPopup");
    el.style.display = 'none';
}