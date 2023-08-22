const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('username', data => {
        socket.username = data; // Assign the username to the socket
    });

    socket.on('chat-message', data => {
        io.emit('chat-message', { username: socket.username, message: data.message }); // Use socket's username
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

