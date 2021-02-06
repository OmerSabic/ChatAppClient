const {ipcRenderer} = require('electron');
var queryURL = new URLSearchParams(window.location.search)
var socket = io(queryURL.get('ip'))

var username = queryURL.get('username')
socket.emit('connectedUser', username);

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('chatMsg', {user: username, msg: document.getElementById('input').value })
    document.getElementById('input').value = '';
});

socket.on('chatMsg', data => {
    var newli = document.createElement("li");
    newli.textContent = data.user + ': ' + data.msg;
    document.getElementById('messages').appendChild(newli);
});

socket.on('connectedUser', data => {
    var newli = document.createElement('li');
    newli.textContent = data.user + ' has joined the chat!\n'+data.users.toString()+' total users.';
    //newli.setAttribute('class', 'console');
    document.getElementById('messages').appendChild(newli);
})

io.on('userDsconnect', data => {
    var newli = document.createElement('li');
    newli.textContent = data.user + ' has left the chat!\n'+data.users.ToString()+' total users.';
    document.getElementById('messages').appendChild(newli);
})