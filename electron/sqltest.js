const sqlite3 = require('sqlite3');
const fs=require("fs");
const database = new sqlite3.Database('./public/db.db');

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
