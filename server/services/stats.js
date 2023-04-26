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
        }
    }
}

module.exports = {
    get
}
