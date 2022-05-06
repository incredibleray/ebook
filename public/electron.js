const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    show: false
    // fullscreen: true
  })
  win.maximize();
  win.loadFile('build/index.html');
  // win.loadURL('http://localhost:3000');

  win.show();
}

app.whenReady().then(() => {
  createWindow()
})