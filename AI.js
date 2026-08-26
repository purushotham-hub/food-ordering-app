const chatBox = document.getElementById("chatBox");

const userInput = document.getElementById("userInput");

const sendButton = document.getElementById("sendButton");

const clearChat = document.getElementById("clearChat");

const typing = document.getElementById("typing");


// Send Message

function sendMessage() {

    const message = userInput.value.trim();

    // Don't send empty message

    if (message === "") {
        return;
    }


    // Add user message

    addMessage(message, "user");


    // Clear input

    userInput.value = "";


    // Show typing

    showTyping();


    // Generate bot response

    setTimeout(function () {

        hideTyping();

        const response = getBotResponse(message);

        addMessage(response, "bot");

    }, 1000);
}


// Add Message

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.classList.add("message");


    // User or Bot

    if (sender === "user") {

        message.classList.add("user-message");

    } else {

        message.classList.add("bot-message");

    }


    // Avatar

    const avatar = document.createElement("div");

    avatar.classList.add("avatar");

    avatar.textContent =
        sender === "user"
            ? "👤"
            : "🤖";


    // Message Text

    const messageText = document.createElement("div");

    messageText.classList.add("message-text");


    const paragraph = document.createElement("p");

    paragraph.textContent = text;


    // Time

    const time = document.createElement("span");

    time.classList.add("time");

    time.textContent = getTime();


    messageText.appendChild(paragraph);

    messageText.appendChild(time);


    message.appendChild(avatar);

    message.appendChild(messageText);


    chatBox.appendChild(message);


    // Scroll down

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Get Time

function getTime() {

    const date = new Date();

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}


// AI Response

function getBotResponse(message) {

    const text = message.toLowerCase();


    // Greetings

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "Hello! 👋 How can I help you today?";

    }


    // Name

    if (text.includes("your name")) {

        return "I'm AI Assistant 🤖, your virtual helper.";

    }


    // HTML

    if (text.includes("html")) {

        return "HTML is used to create the structure of a webpage.";

    }


    // CSS

    if (text.includes("css")) {

        return "CSS is used to design and style webpages.";

    }


    // JavaScript

    if (
        text.includes("javascript") ||
        text.includes("js")
    ) {

        return "JavaScript makes websites interactive and dynamic.";

    }


    // Project

    if (text.includes("project")) {

        return "Great project ideas include an Expense Tracker, Weather App, E-Commerce Website and AI Chatbot.";

    }


    // Career

    if (text.includes("career")) {

        return "For web development, focus on HTML, CSS, JavaScript, Git, GitHub, APIs and eventually React.";

    }


    // Thank you

    if (
        text.includes("thank") ||
        text.includes("thanks")
    ) {

        return "You're welcome! 😊";

    }


    // Bye

    if (text.includes("bye")) {

        return "Goodbye! 👋 See you again!";

    }


    // Default

    return "That's an interesting question! 🤔 I'm currently a demo AI chatbot. You can connect me to an AI API to generate real AI responses.";

}


// Show Typing

function showTyping() {

    typing.style.display = "flex";

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Hide Typing

function hideTyping() {

    typing.style.display = "none";
}


// Send Button

sendButton.addEventListener(
    "click",
    sendMessage
);


// Enter Key

userInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


// Clear Chat

clearChat.addEventListener(
    "click",
    function () {

        chatBox.innerHTML = "";

        addMessage(
            "Chat cleared! 🧹 How can I help you?",
            "bot"
        );

    }
);