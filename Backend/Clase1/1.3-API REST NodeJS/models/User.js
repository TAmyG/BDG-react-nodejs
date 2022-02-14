const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: String,
  jobTitle: { type: String, required: true, trim: true },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.pre("save", function genPassword(next) {
  try {
    const isModifiedPass = this.isModified("password");
    if (!isModifiedPass) {
      return next();
    }
    this.password = bcrypt.hashSync(
      this.password,
      parseInt(process.env.SALTROUNDS, 0)
    );
    return next();
  } catch (error) {
    console.error("pre save:", error);
    return next(error);
  }
});

UserSchema.methods.validatePassword = function validatePassword(password) {
  try {
    return bcrypt.compareSync(password, this.password);
  } catch (error) {
    console.error("validatePassword:", error);
    return false;
  }
};

module.exports = mongoose.model("User", UserSchema);
