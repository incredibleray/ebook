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
  win.loadFile('build/index.html');
  // win.loadURL('http://localhost:3000');

  win.show();
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()
})


const database = new sqlite3.Database('/home/nk643/桌面/DataBase/2022-09/2022-08-29_DB.db', (err) => {
  if (err) console.error('Database opening error: ', err);
});

let data={};
ipcMain.handle('getRealtimeData', (event, arg) => {
 
let sql="SELECT 有功功率 FROM  主变侧电表数据 WHERE  ID = (SELECT MAX(ID) FROM 主变侧电表数据)";

database.get(sql, (err, row) => {
    console.log(err);
    console.log(row);

    data={...data, ...row};
});

sql="SELECT 累计充电电量, 累计放电电量 FROM  电池储能簇1数据 WHERE  ID = (SELECT MAX(ID) FROM 电池储能簇1数据)"

database.get(sql, (err, row) => {
  console.log(err);
  console.log(row);

  data={...data, ...row};
});

sql="SELECT 交流侧有功 AS batteryPower FROM  储能变流器2数据 WHERE  ID = (SELECT MAX(ID) FROM 储能变流器2数据)"

database.get(sql, (err, row) => {
  console.log(err);
  console.log(row);

  data={...data, ...row};
});

sql="SELECT 交流侧有功 AS solarPower FROM  光伏逆变器1数据 WHERE  ID = (SELECT MAX(ID) FROM 光伏逆变器1数据)"

database.get(sql, (err, row) => {
  console.log(err);
  console.log(row);

  data={...data, ...row};
});
  return data;
  
});

let graphData=[];
ipcMain.handle('getGraphData', (event, arg) => {
  sql="SELECT 光伏日发电量 FROM  光伏逆变器1数据 ORDER BY ID DESC LIMIT 12"
  database.all(sql, (err, rows) => {
    console.log(err);
    console.log(rows);
  
    graphData=rows;
  });

  return graphData;
});