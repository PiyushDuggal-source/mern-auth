const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userInfo = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  hobby: String,
  salary: Number,
});

const UserInfo = mongoose.model("userInfo", userInfo);

module.exports = UserInfo;
