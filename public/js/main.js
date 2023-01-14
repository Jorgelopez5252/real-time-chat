const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username and room from url, we use destructring
const {username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

//join chat room
socket.emit('joinRoom' , {username, room})

//message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message);

    //scroll down when a new message shows up
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get message text
    const msg = e.target.elements.msg.value;

    //emit message to server
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// output message to dom with DOM Manipulation
function outputMessage(message) {

const div = document.createElement('div');
div.classList.add('message');
// dot notation being added since message is now an object
div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
<p class="text">
    ${message.text}
</p>`;
document.querySelector('.chat-messages').appendChild(div);
}