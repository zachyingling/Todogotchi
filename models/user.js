const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  login: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;