const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(50),
      },
      name: {
        type: DataTypes.STRING(50),
      },
      phone: {
        type: DataTypes.STRING(10),
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("PRO", "CLIENT"),
      },
    },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: (user) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync(saltRounds, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: (user) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync(saltRounds, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
};
