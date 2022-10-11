const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");

const sequelize = new Sequelize(
  "postgres://emma:emma@127.0.0.1:5432/nails_app"
);

const modelDefiners = [
  require("./models/user.model"),
  require("./models/reservation.model"),
  require("./models/service.model"),
  require("./models/store.model"),
  require("./models/time-range.model"),
];

modelDefiners.forEach((modelDefiner) => {
  modelDefiner(sequelize);
});

applyExtraSetup(sequelize);

module.exports = sequelize;
