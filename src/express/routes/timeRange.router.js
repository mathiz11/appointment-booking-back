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

module.exports = router;
