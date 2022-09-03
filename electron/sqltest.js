const sqlite3 = require('sqlite3');
const fs=require("fs");
const database = new sqlite3.Database('./public/2022-08-29_DB.db');

let sql="SELECT 有功功率 FROM  主变侧电表数据 WHERE  ID = (SELECT MAX(ID) FROM 主变侧电表数据)";
data={}

database.get(sql, (err, row) => {
    console.log(err);
    console.log(row);

    data={...data, ...row};

    fs.writeFile("./data.txt", 
    JSON.stringify(data),
     err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
});

sql="SELECT 累计充电电量, 累计放电电量 FROM  电池储能簇1数据 WHERE  ID = (SELECT MAX(ID) FROM 电池储能簇1数据)"

database.get(sql, (err, row) => {
  console.log(err);
  console.log(row);

  data={...data, ...row};

  fs.writeFile("./data.txt", 
  JSON.stringify(data),
   err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
});

sql="SELECT 交流侧有功 AS batteryPower FROM  储能变流器2数据 WHERE  ID = (SELECT MAX(ID) FROM 储能变流器2数据)"

database.get(sql, (err, row) => {
  console.log(err);
  console.log(row);

  data={...data, ...row};

  fs.writeFile("./data.txt", 
  JSON.stringify(data),
   err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
});

sql="SELECT 交流侧有功 AS solarPower FROM  光伏逆变器1数据 WHERE  ID = (SELECT MAX(ID) FROM 光伏逆变器1数据)"

database.get(sql, (err, row) => {
  console.log(err);
  console.log(row);

  data={...data, ...row};

  fs.writeFile("./data.txt", 
  JSON.stringify(data),
   err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
});

sql="SELECT 光伏日发电量 FROM  光伏逆变器1数据 ORDER BY ID DESC LIMIT 12"
database.all(sql, (err, rows) => {
  console.log(err);
  console.log(rows);

  fs.writeFile("./graph.txt", 
  JSON.stringify(rows),
   err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
});
