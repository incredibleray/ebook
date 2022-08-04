const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const fs=require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    // fullscreen: true
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // devTools:true
    },
    
  })
  win.menuBarVisible=false;
  win.maximize();
  // win.loadFile('build/index.html');
  win.loadURL('http://localhost:3000');

  win.show();
  win.webContents.openDevTools();

  // create hidden worker window
  workerWindow = new BrowserWindow({
    show: true,
    webPreferences: { nodeIntegration: true,
      devTools:true
    }
  });
  workerWindow.loadFile('electron/worker.html');
}

app.whenReady().then(() => {
  createWindow()
})


const database = new sqlite3.Database('./public/db.db', (err) => {
  if (err) console.error('Database opening error: ', err);
});

ipcMain.on('asynchronous-message', (event, arg) => {
  const sql="SELECT * FROM 电池日充电量";

  database.all(sql, (err, rows) => {
      console.log(err);
      console.log(rows);
      fs.writeFile("./data.txt", JSON.stringify(rows), err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });

  });

  
  
});