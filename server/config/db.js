const mysql = require("mysql");

const config = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "celebrities_db"
}

const connection = mysql.createConnection(config);

module.exports = connection;
