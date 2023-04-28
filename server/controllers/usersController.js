const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const { success, error } = require("../config/responses");
const users = require("../services/users");

const post = {
    register: asyncHandler(async (req, res) => {
        const { email, password, c_password } = req.body;

        if (!email || !password) {
            throw new Error("The email and password are required.");
        }

        if (password !== c_password) {
            throw new Error("The password's do not match.");
        }

        {
            const result = await users.get.byEmail(email);

            if (typeof result === "object" && result.length !== 0) {
                throw new Error("Dublicate email address!");
            }
        }

        const passwordHash = users.post.passwordHash(password);

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
            throw new Error("The email and password are required.");
        }

        const result = await users.get.byEmail(email);

        if (typeof result === "object" && result.length === 0) {
            throw new Error("The email or password do not valid.");
        }

        if (typeof result !== "object" || typeof result[0]?.id !== 'number') {
            throw new Error(result);
        }

        if (!bcrypt.compareSync(password, result[0].password)) {
            throw new Error("The email or password do not valid.");
        }

        const token = users.post.createToken(email);

        res.send(success({ token }));
        return;
    }),
    changePassword: asyncHandler(async (req, res) => {
        const { email, old_password, new_password } = req.body;

        if (email == '' || old_password == '' || new_password == '') {
            throw new Error("The email, old password and new password are required.");
        }

        if (old_password === new_password) {
            throw new Error("The new password must be different from the old password.");
        }

        {
            const result = await users.get.byEmail(email);

            if (typeof result !== "object") {
                throw new Error(result);
            }

            if (Array.from(result).length === 0) {
                throw new Error("Invalid email address!");
            }

            if (!bcrypt.compareSync(old_password, result[0].password)) {
                throw new Error("The old password is wrong!");
            }
        }

        const passwordHash = users.post.passwordHash(new_password);

        const result = await users.post.changePassword(email, passwordHash);

        if (result.affectedRows === 0) {
            throw new Error("Invalid email address!");
        }

        res.send(success());
    })
}

const get = {
    currentUser: asyncHandler(async (req, res, next) => {
        const email = req.user.email;

        const result = await users.get.byEmail(email);

        if (typeof result === "object" && result.length !== 0) {
            const user = result[0];
            delete user.password;
            res.send(success(user));
            return;
        }

        throw new Error(result);
    })
}

module.exports = {
    post,
    get,
}
