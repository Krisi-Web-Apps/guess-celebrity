const connection = require("../config/db");

const post = {
    create: (data) => {
        const sql = `INSERT INTO celebrities (famous_name, image_url) VALUES ('${data.famous_name}', '${data.image_url}')`;

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
