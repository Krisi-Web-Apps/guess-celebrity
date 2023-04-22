const asyncHandler = require("express-async-handler");

const { success, error } = require("../config/responses");
const celebrity = require("../services/celebrity");

const post = {
  save: asyncHandler(async (req, res) => {
    let result;

    if (typeof req.body.id !== "undefined") {
      result = await celebrity.post.update(req.body.id, req.body);

      if (result.affectedRows === 0) {
        res.send(error("Invalid id"));
        return;
      }
    } else {
      result = await celebrity.post.create(req.body);
    }

    if (typeof result.insertId === "number") {
      res.send(success(result.insertId));
      return;
    }

    throw new Error(result);
  }),
  createBulk: asyncHandler(async (req, res) => {
    if (!Array.isArray(req.body)) {
      res.send(error("The input must be an array"));
      return;
    }

    const result = await celebrity.post.createBulk(req.body);

    if (result.affectedRows > 0) {
      res.send(success(result));
      return;
    }

    throw new Error(result);
  })
};

module.exports = {
  post
};