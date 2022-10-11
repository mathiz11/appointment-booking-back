const express = require("express");
const apiUtil = require("../utils/api.util");
const reservationService = require("../services/reservation.service");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, async (_, res) => {
  apiUtil.sendResponse(res, await reservationService.getAll());
});

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await reservationService.getOne(id));
});

router.post("/", auth, async (req, res) => {
  apiUtil.sendResponse(res, await reservationService.create(req.body));
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Vous devez spécifier un ID correct." });
  }

  apiUtil.sendResponse(res, await reservationService.remove(id));
});

module.exports = router;
