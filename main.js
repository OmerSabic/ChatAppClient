const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
//var socket = require('./app/socket.io/socket.io.min.js');

var win;
var srv;
var user;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(`file://${__dirname}/app/addServer.html`)
}

ipcMain.on('open-new-window', (event, fileName) => {
  if(fileName === "main") {
    win.loadURL(`file://${__dirname}/app/` + fileName + `.html?ip=${srv}&username=${user}`);
  }
  else {
    win.loadURL(`file://${__dirname}/app/` + fileName + `.html`)
  }
})

ipcMain.on('setSrv', (event, ip) => {
  srv = ip;
})

ipcMain.on('setName', (event, nem) => {
  user = nem;
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if(srv) {

    }
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})