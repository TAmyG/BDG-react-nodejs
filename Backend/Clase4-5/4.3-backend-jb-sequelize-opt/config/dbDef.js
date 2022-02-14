const sequelize = require("./sequelize");
const data = require("../data");

const syncDB = async () => {
  try {
    const { models } = sequelize;
    //models.Company.hasMany(models.Job, { foreignKey: "id" });
    //models.Job.belongsTo(models.Company, { foreignKey: "companyId" });

    if (+process.env.BULK_DATA === 1) {
      bulkData(models);
    }
  } catch (error) {
    console.log("Error on populating: ", error);
  }
};

const bulkData = ({ Job, Company, User }) => {
  Company.bulkCreate(data.companiesData);
  Job.bulkCreate(data.jobsData);
  User.bulkCreate(data.usersData);
};

module.exports = { syncDB };
