const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Job = sequelize.define("Job", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "CASCADE",
      references: {
        model: "Companies",
        key: "id",
      },
    },
  });

  return Job;
};
