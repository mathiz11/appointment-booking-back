const express = require("express");
const auth = require("../middlewares/auth");
const serviceService = require("../services/service.service");
const timeRangeService = require("../services/timeRange.service");
const apiUtil = require("../utils/api.util");

const router = express.Router();

router.get("/", auth, async (_, res) => {
  apiUtil.sendResponse(res, await serviceService.getAll());
});

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await serviceService.getOne(id));
});

router.get("/:id/schedules", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await timeRangeService.getBy(id));
});

router.post("/", auth, async (req, res) => {
  apiUtil.sendResponse(res, await serviceService.create(req.body));
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await serviceService.remove(id));
});

module.exports = router;
