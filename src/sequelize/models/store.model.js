const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "store",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
