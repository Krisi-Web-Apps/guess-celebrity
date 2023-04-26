const asyncHandler = require("express-async-handler");

const { success } = require("../config/responses");
const stats = require("../services/stats");

const get = {
    users: {
        count: asyncHandler(async (req, res, next) => {
            const result = await stats.get.users.count();

            if (typeof result === "object") {
                res.send(success(result));
                return;
            }

            throw new Error(result);
        })
    }
}

module.exports = {
    get
}
