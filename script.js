const socket = io();

const usernameInputContainer = document.getElementById('username-input-container');
const usernameInput = document.getElementById('username-input');
const usernameButton = document.getElementById('username-button');
const chatContainer = document.getElementById('chat-container');
const userList = document.getElementById('user-list');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const currentUsername = document.getElementById('current-username');

let username = '';

/// Function to convert text to emoji (case-insensitive)
function convertToEmoji(text) {
    const emojiMap = {
        "rocket": "🚀",
        "lit": "🔥",
        "beats": "🎶",
        "sad": "🥲",
        "react": "⚛️",
        "woah": "😲",
        "hey": "👋",
        "lol": "😂",
        "like": "🤍",
        "congratulations": "🎉",
        // Add more emoji mappings as needed
    };

    for (const key in emojiMap) {
        const lowercaseKey = key.toLowerCase();
        if (text.toLowerCase().includes(lowercaseKey)) {
            text = text.replace(new RegExp(lowercaseKey, 'gi'), emojiMap[key]);
        }
    }
    return text;
}


// Function to add a new message to the chat
function addMessageToChat(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

usernameButton.addEventListener('click', () => {
    const enteredUsername = usernameInput.value.trim();
    if (enteredUsername !== '') {
        username = enteredUsername;
        usernameInputContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        socket.emit('username', username);
        currentUsername.textContent = username; // Display the username
    }
});



sendButton.addEventListener("click", () => {
    const input = messageInput.value;

    if (input.startsWith("/")) {
        handleCommand(input);
    } else {
        sendMessage(input);
    }

    // Clear input fields
    messageInput.value = "";
    imageInput.value = ""; // Clear image input
});

function handleCommand(command) {
    // Remove the leading slash and split the command into parts
    const parts = command.substr(1).split(" ");
    const commandName = parts[0].toLowerCase();

    // Implement different commands based on commandName
    switch (commandName) {
        case "help":
            prompt("Available commands: /help: for available slash commands, /about: about info, /clear: clear the chat, /random: generates a random integer");
            break;
        case "about":
            addMessageToChat("This is a chat app created by [Shivansh Chopra].");
            break;
            case "clear":
                clearChat();
                break;
                case "random":
                    const randomNumber = Math.floor(Math.random() * 100);
                    addMessageToChat(`Random number: ${randomNumber}`);
                    break;
        default:
            addMessageToChat("Unknown command. Type /help for available commands.");
            break;
    }
}

function clearChat() {
    chatMessages.innerHTML = ""; // Clear chat messages
}


function addMessageToChat(message) {
    // Display messages in the chat
    const messageContainer = document.createElement("div");
    messageContainer.className = "message";
    messageContainer.textContent = message;

    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}



sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        const emojiMessage = convertToEmoji(message); // Convert to emoji
        socket.emit('chat-message', { username, message: emojiMessage });
        messageInput.value = ''; // Clear the input
    }
});

messageInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendButton.click();
    }
});
const imageInput = document.getElementById("image-input");

sendButton.addEventListener("click", () => {
    const textMessage = messageInput.value;
    const imageFile = imageInput.files[0];

    if (textMessage.trim() !== "" || imageFile) {
        if (textMessage.trim() !== "") {
            sendMessage(textMessage);
        }

        if (imageFile) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageDataUrl = event.target.result;
                sendImage(imageDataUrl);
            };

            reader.readAsDataURL(imageFile);
        }
    }
});

function sendImage(imageDataUrl) {
    const image = document.createElement("img");
    image.src = imageDataUrl;
    image.className = "uploaded-image";

    const messageContainer = document.createElement("div");
    messageContainer.className = "message";
    messageContainer.appendChild(image);

    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


socket.on('chat-message', data => {
    const formattedMessage = `${data.username}: ${data.message}`;
    addMessageToChat(formattedMessage);
});
