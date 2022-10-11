const express = require("express");
const auth = require("../middlewares/auth");
const userService = require("../services/user.service");
const apiUtil = require("../utils/api.util");

const router = express.Router();

router.get("/", auth, async (_, res) => {
  apiUtil.sendResponse(res, await userService.getAll());
});

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await userService.getOne(id));
});

router.post("/", async (req, res) => {
  apiUtil.sendResponse(res, await userService.create(req.body));
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await userService.remove(id));
});

module.exports = router;
