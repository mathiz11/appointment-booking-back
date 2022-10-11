const app = require("./express/app");
const sequelize = require("./sequelize");
require("dotenv").config();

const PORT = process.env.PORT;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("Database synchronized OK!");
  } catch (error) {
    console.log("Unable to connect to the database: ", error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}/`);
  });
}

init();
