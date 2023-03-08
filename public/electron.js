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


const database = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('Database opening error: ', err);
});

let data={};
let graphData={};

const GetRealtimeData=()=> {
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
  
  sql="SELECT 光伏日发电量 AS solarPower FROM  光伏逆变器1数据 WHERE  ID = (SELECT MAX(ID) FROM 光伏逆变器1数据)";
  
  database.get(sql, (err, row) => {
    console.log(err);
    console.log(row);
  
    data={...data, ...row};
  });
}

const GetGraphData=()=>{
  sql="SELECT 光伏日发电量+0.1 AS 光伏日发电量, 时间戳, 时间值 FROM  光伏逆变器1数据 WHERE 时间值 in (60, 61, 62, 63, 64, 3600, 3601, 3602, 3603, 3604, 7200, 7201, 7202, 7203, 7204, 10800, 10801, 10802, 10803, 10804, 14400, 14401, 14402, 14403, 14404, 18000, 18001, 18002, 18003, 18004, 21600, 21601, 21602, 21603, 21604, 25200, 25201, 25202, 25203, 25204, 28800, 28801, 28802, 28803, 28804, 32400, 32401, 32402, 32403, 32404, 36000, 36001, 36002, 36003, 36004, 39600, 39601, 39602, 39603, 39604, 43200, 43201, 43202, 43203, 43204, 46800, 46801, 46802, 46803, 46804, 50400, 50401, 50402, 50403, 50404, 54000, 54001, 54002, 54003, 54004, 57600, 57601, 57602, 57603, 57604, 61200, 61201, 61202, 61203, 61204, 64800, 64801, 64802, 64803, 64804, 68400, 68401, 68402, 68403, 68404, 72000, 72001, 72002, 72003, 72004, 75600, 75601, 75602, 75603, 75604, 79200, 79201, 79202, 79203, 79204, 82800, 82801, 82802, 82803, 82804, 86400, 86401, 86402, 86403, 86404) ORDER BY 时间值"
  database.all(sql, (err, rows) => {
    console.log(err);
    console.log(rows);
  
    graphData={...graphData, solar:rows};
  });

  sql="SELECT 正向有功电能+反向有功电能 AS 日用电量, 时间戳, 时间值 FROM  企业侧电表数据 WHERE 时间值 in (60, 61, 62, 63, 64, 3600, 3601, 3602, 3603, 3604, 7200, 7201, 7202, 7203, 7204, 10800, 10801, 10802, 10803, 10804, 14400, 14401, 14402, 14403, 14404, 18000, 18001, 18002, 18003, 18004, 21600, 21601, 21602, 21603, 21604, 25200, 25201, 25202, 25203, 25204, 28800, 28801, 28802, 28803, 28804, 32400, 32401, 32402, 32403, 32404, 36000, 36001, 36002, 36003, 36004, 39600, 39601, 39602, 39603, 39604, 43200, 43201, 43202, 43203, 43204, 46800, 46801, 46802, 46803, 46804, 50400, 50401, 50402, 50403, 50404, 54000, 54001, 54002, 54003, 54004, 57600, 57601, 57602, 57603, 57604, 61200, 61201, 61202, 61203, 61204, 64800, 64801, 64802, 64803, 64804, 68400, 68401, 68402, 68403, 68404, 72000, 72001, 72002, 72003, 72004, 75600, 75601, 75602, 75603, 75604, 79200, 79201, 79202, 79203, 79204, 82800, 82801, 82802, 82803, 82804, 86400, 86401, 86402, 86403, 86404) ORDER BY 时间值"
  database.all(sql, (err, rows) => {
    console.log(err);
    console.log(rows);
  
    graphData={...graphData, consumption:rows};
  });
};

GetRealtimeData();
GetGraphData();


ipcMain.handle('getRealtimeData', (event, arg) => {
  GetRealtimeData();
  return data;
});


ipcMain.handle('getGraphData', (event, arg) => {
  GetGraphData();
  return graphData;
});