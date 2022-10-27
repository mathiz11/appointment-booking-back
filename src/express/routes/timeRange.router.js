const express = require("express");
const auth = require("../middlewares/auth");
const timeRangeService = require("../services/timeRange.service");
const apiUtil = require("../utils/api.util");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  apiUtil.sendResponse(res, await timeRangeService.getAll(req.query));
});

router.post("/", auth, async (req, res) => {
  apiUtil.sendResponse(res, await timeRangeService.create(req.body));
});

router.post("/date", auth, async (req, res) => {
  const { date } = req.body;
  apiUtil.sendResponse(
    res,
    await timeRangeService.getAllByDate(date, req.query)
  );
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  let result = await timeRangeService.getOne(id);

  if (result.data) {
    result = await timeRangeService.remove(id);
  }

  apiUtil.sendResponse(res, result);
});

module.exports = router;
