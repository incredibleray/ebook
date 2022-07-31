const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./public/db.db');

const sql="SELECT * FROM 电池日充电量";

database.all(sql, (err, rows) => {
    console.log(err);
    console.log(rows);
});
