const {ipcRenderer} = require('electron');

function openChat() {
    ipcRenderer.send('setName', document.getElementById('username').value)
    ipcRenderer.send('open-new-window', 'main');
}

window.onload = () => {
    document.getElementById('connectBtn').addEventListener('click', openChat)
}
