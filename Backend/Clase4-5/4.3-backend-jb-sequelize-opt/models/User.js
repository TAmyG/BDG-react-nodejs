const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },

      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    password: {
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

  // Hook methods
  User.beforeBulkCreate((users) => {
    try {
      users = users.map(
        (user) =>
          (user.password = bcrypt.hashSync(
            user.password,
            parseInt(process.env.SALTROUNDS, 0)
          ))
      );
      return users;
    } catch (error) {
      console.error("beforeBulkCreate:", error);
    }
  });

  // Instance Methods
  User.prototype.validatePassword = function (password) {
    try {
      return bcrypt.compareSync(password, this.password);
    } catch (error) {
      console.error("validatePassword:", error);
      return false;
    }
  };

  return User;
};
