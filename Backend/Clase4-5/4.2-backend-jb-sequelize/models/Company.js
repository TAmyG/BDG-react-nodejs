const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Company = sequelize.define("Company", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Company;
};
