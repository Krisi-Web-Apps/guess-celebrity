const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const connection = require("../config/db");

const post = {
    register: (email, password) => {
        const sql = `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`;

        const promise = new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        
        return promise;
    },
    createToken: (email) => {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
        return token;
    },
    passwordHash: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        return passwordHash;
    },
    changePassword: (email, password) => {
        const sql = `UPDATE users SET \`password\`='${password}' WHERE email = '${email}';`;

        const promise = new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        
        return promise;
    }
}

const get = {
    byEmail: (email) => {
        const sql = `SELECT * FROM users WHERE email = '${email}'`;

        const promise = new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        
        return promise;
    }
}

module.exports = {
    post,
    get
}
