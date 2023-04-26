const connection = require("../config/db");

const get = {
    users: {
        count: () => {
            const sql = `
                SELECT COUNT(*) AS 'count'
                FROM users;
            `;

            const promise = new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            return promise;
        },
        all: () => {
            const sql = `SELECT * FROM users;`;

            const promise = new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            return promise;
        }
    },
    celebrities: {
        count: () => {
            const sql = `
                SELECT COUNT(*) AS 'count'
                FROM celebrities;
            `;

            const promise = new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            return promise;
        }
    }
}

module.exports = {
    get
}
