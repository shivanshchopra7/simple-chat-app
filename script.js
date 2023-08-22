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
        "sad": "🥲"
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

socket.on('chat-message', data => {
    const formattedMessage = `${data.username}: ${data.message}`;
    addMessageToChat(formattedMessage);
});
