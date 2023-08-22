const socket = io();

const usernameInputContainer = document.getElementById('username-input-container');
const usernameInput = document.getElementById('username-input');
const usernameButton = document.getElementById('username-button');
const chatContainer = document.getElementById('chat-container');
const userList = document.getElementById('user-list');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');


usernameButton.addEventListener('click', () => {
    const enteredUsername = usernameInput.value.trim();
    if (enteredUsername !== '') {
        username = enteredUsername;
        usernameInputContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        socket.emit('username', username); // Send the username to the server
    }
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chat-message', { username, message }); // Send both username and message
        messageInput.value = '';
    }
});
messageInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent newline in input field
        sendButton.click(); // Simulate a click on the send button
    }
});
// ... Other existing code ...

messageInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent newline in input field
        sendButton.click(); // Simulate a click on the send button
    }
});

// ... Other existing code ...

// Existing code ...

// Select the elements
const currentUsername = document.getElementById('current-username'); // Added this line

// Existing code ...

let username = '';

usernameButton.addEventListener('click', () => {
    const enteredUsername = usernameInput.value.trim();
    if (enteredUsername !== '') {
        username = enteredUsername;
        usernameInputContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        socket.emit('username', username);
        // Display the username
        currentUsername.textContent = username;
    }
});

// Existing code ...

// ... Existing code ...

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        const emojiMessage = convertToEmoji(message); // Convert to emoji
        socket.emit('message', { username, message: emojiMessage });
        messageInput.value = ''; // Clear the input
    }
});


// ... Other existing code ...

socket.on('chat-message', data => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = `${data.username}: ${data.message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
// Existing code ...

// Function to convert text to emoji

// ... Existing code ...

