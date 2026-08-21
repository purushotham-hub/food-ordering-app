function sendMessage() {

    let input = document.getElementById("messageInput");
    let chatBox = document.getElementById("chatBox");

    let message = input.value.trim();

    if (message === "") {
        return;
    }

    // Create sent message
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "sent");

    let messageText = document.createElement("span");
    messageText.textContent = message;

    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);

    // Clear input
    input.value = "";

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Automatic reply
    setTimeout(function () {

        let replyDiv = document.createElement("div");
        replyDiv.classList.add("message", "received");

        let replyText = document.createElement("span");

        replyText.textContent = "Thanks for your message! 😊";

        replyDiv.appendChild(replyText);
        chatBox.appendChild(replyDiv);

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 1000);
}


// Send message when Enter key is pressed
document.getElementById("messageInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});