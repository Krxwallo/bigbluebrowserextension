console.log("Starting background.js...")


// Content Script Communication
browser.runtime.onMessage.addListener((message) => {
    console.log("Received Message from content script: " + message);
    console.log("Forwarding to bigbluebot.")
    sendToBot(message)
});

// ============================




var port = browser.runtime.connectNative("bigbluebot");
console.log("Connected to port: " + port)

function sendToBot(message) {
    port.postMessage(message)
    console.log("Sent " + message + " to bigbluebot.")
}


port.onMessage.addListener((message) => {
    console.log("BigBlueBot LOG: " + message);
});

port.onDisconnect.addListener((a) => {
    console.log("Port DISCONNECT.")
});

console.log("Sending...");
//var sending = browser.runtime.sendNativeMessage("bigbluebot",    "ping");
//sending.then(onResponse, onError);