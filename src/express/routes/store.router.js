const express = require("express");
const auth = require("../middlewares/auth");
const storeService = require("../services/store.service");
const apiUtil = require("../utils/api.util");

const router = express.Router();

router.get("/", auth, async (_, res) => {
  apiUtil.sendResponse(res, await storeService.getAll());
});

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await storeService.getOne(id));
});

router.post("/", auth, async (req, res) => {
  apiUtil.sendResponse(res, await storeService.create(req.body));
});

router.get("/user/:userId", auth, async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await storeService.getByUserId(userId));
});

router.post("/", auth, async (req, res) => {
  apiUtil.sendResponse(res, await storeService.create(req.body));
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await storeService.remove(id));
});

module.exports = router;
