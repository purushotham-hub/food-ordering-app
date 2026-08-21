const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");

// Connect to WebSocket server
const socket = new WebSocket("ws://localhost:8080");

// When connection is established
socket.onopen = function () {

    console.log("Connected to WebSocket server");

    status.textContent = "🟢 Online";

    sendButton.disabled = false;
};


// When a message is received
socket.onmessage = function (event) {

    addMessage(event.data);

};


// When connection is closed
socket.onclose = function () {

    console.log("Disconnected from server");

    status.textContent = "🔴 Offline";

    sendButton.disabled = true;
};


// When an error occurs
socket.onerror = function (error) {

    console.log("WebSocket Error:", error);

    status.textContent = "⚠️ Connection Error";

};


// Send message
function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    if (socket.readyState === WebSocket.OPEN) {

        socket.send(message);

        messageInput.value = "";

        messageInput.focus();
    }
}


// Display message
function addMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.classList.add("message");

    messageElement.textContent = message;

    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Send button
sendButton.addEventListener("click", sendMessage);


// Press Enter to send
messageInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});