const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user.router");
const serviceRouter = require("./routes/service.router");
const storeRouter = require("./routes/store.router");
const reservationRouter = require("./routes/reservation.router");
const authRouter = require("./routes/auth.router");

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use("/api/services", serviceRouter);
app.use("/api/stores", storeRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/auth", authRouter);

app.get("/", (_, res) => {
  res.send("Welcome in API!");
});

module.exports = app;
