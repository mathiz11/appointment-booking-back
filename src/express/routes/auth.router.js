const express = require("express");
const { models } = require("../../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorUtil = require("../utils/error.util");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const defaultLoginErrorMessage = "Les identifiants saisis sont incorrects.";

  try {
    const user = await models.user.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: defaultLoginErrorMessage });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: defaultLoginErrorMessage });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.PRIVATE_JWT_KEY,
      { expiresIn: "24h" }
    );

    return res.json({ data: user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorUtil.DEFAULT_ERROR_MESSAGE });
  }
});

module.exports = router;
