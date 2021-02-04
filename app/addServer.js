const {ipcRenderer} = require('electron');
var socket;

function checkServer() {
    socket = io(document.getElementById('serverIp').value);
    socket.on('connect', function() {
        if(socket.connected) {
            ipcRenderer.send('setSrv', document.getElementById('serverIp').value)
            ipcRenderer.send('open-new-window', 'login');
        }
    });
}

window.onload = () => {
    document.getElementById('connectBtn').addEventListener('click', checkServer)
}
