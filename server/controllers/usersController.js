const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const { success, error } = require("../config/responses");
const users = require("../services/users");

const post = {
    register: asyncHandler(async (req, res) => {
        const { email, password, c_password } = req.body;

        if (email == '' || password == '') {
            res.send(error("The email and password are required"));
            return;
        }

        if (password !== c_password) {
            res.send(error("The password's do not match"));
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const result = await users.post.register(email, passwordHash);

        if (typeof result.insertId === "number") {
            res.send(success({
                id: result.insertId
            }));
            return;
        }

        throw new Error(result);
    }),
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (email == '' || password == '') {
            res.send(error("The email and password are required"));
            return;
        }

        const result = await users.get.byEmail(email);
        
        if (typeof result !== "object" || typeof result[0].id !== 'number') {
            throw new Error(result);
        }

        if (!bcrypt.compareSync(password, result[0].password)) {
            res.send(error("The email or password do not match"));
            return;
        }

        const token = users.post.createToken(email);

        res.send(success({ token }));
        return;
    })
}

module.exports = {
    post,
}
