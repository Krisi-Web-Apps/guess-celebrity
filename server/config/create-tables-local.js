require("dotenv").config();
const mysql = require("mysql");
const fs = require('fs');
const colors = require("colors");

connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect(function (err) {
    if (err) throw new Error(err);

    let promises = [];
    
    promises.push(createTable("users", fs.readFileSync("sql/users.sql").toString()));
    promises.push(createTable("celebrities", fs.readFileSync("sql/celebrities.sql").toString()));

    Promise.all(promises).then(() => process.exit(0));
});

const createTable = (name, sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            console.log(`${colors.green(name)} table created!`);
            resolve();
        });
    });
}
