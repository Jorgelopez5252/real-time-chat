const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app)
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when a client connects
io.on('connection', socket => {

    socket.emit('message', formatMessage(botName , 'Welcome to ChatCord!'));

    // notify when a user connects
    socket.broadcast.emit('message', 'A user has Joined the chat');

    // Notfies when client leaves
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    });

    //listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', msg)
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));