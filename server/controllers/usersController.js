const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const { success, error } = require("../config/responses");
const users = require("../services/users");

const post = {
    register: asyncHandler(async (req, res) => {
        const { email, password, c_password } = req.body;

        if (!email || !password) {
            res.status(400)
                .send(error("The email and password are required."));
            return;
        }

        if (password !== c_password) {
            res.status(400)
                .send(error("The password's do not match."));
            return;
        }

        {
            const result = await users.get.byEmail(email);

            if (typeof result === "object" && result.length !== 0) {
                res.status(409)
                    .send(error("Dublicate email address!"));
                return;
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
            res.status(400)
                .send(error("The email and password are required."));
            return;
        }

        const result = await users.get.byEmail(email);

        if (typeof result === "object" && result.length === 0) {
            res.status(400)
                .send(error("Invalid email address!"));
            return;
        }

        if (typeof result !== "object" || typeof result[0]?.id !== 'number') {
            throw new Error(result);
        }

        if (!bcrypt.compareSync(password, result[0].password)) {
            res.status(400)
                .send(error("The email or password do not match."));
            return;
        }

        const token = users.post.createToken(email);

        res.send(success({ token }));
        return;
    }),
    changePassword: asyncHandler(async (req, res) => {
        const { email, old_password, new_password } = req.body;

        if (email == '' || old_password == '' || new_password == '') {
            res.status(400)
                .send(error("The email, old password and new password are required."));
            return;
        }

        if (old_password === new_password) {
            res.status(400)
                .send(error("The new password must be different from the old password."));
            return;
        }

        {
            const result = await users.get.byEmail(email);

            if (typeof result !== "object") {
                throw new Error(result);
            }

            if (Array.from(result).length === 0) {
                res.status(400)
                    .send(error("Invalid email address!"));
                return;
            }

            if (!bcrypt.compareSync(old_password, result[0].password)) {
                res.status(400)
                    .send(error("The old password is wrong!"));
                return;
            }
        }

        const passwordHash = users.post.passwordHash(new_password);

        const result = await users.post.changePassword(email, passwordHash);

        if (result.affectedRows === 0) {
            res.status(409)
                .send(error("Invalid email address!"));
            return;
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
