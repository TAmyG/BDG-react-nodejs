const Sequelize = require("sequelize");
const Models = require("../models");

const sequelize = new Sequelize(
  process.env.MDBNAME,
  process.env.MUSER,
  process.env.MPASSWORD,
  {
    host: process.env.MIP,
    dialect: process.env.MDIALECT,
    port: parseInt(process.env.MPORT, 0),
  }
);

for (const modelDefiner of Models) {
  modelDefiner(sequelize);
}
module.exports = sequelize;
