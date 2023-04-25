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
    }
}

module.exports = {
    post
}
