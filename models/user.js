const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _userId:{
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  login: {
    type: Date,
    //formerly date.now, is this change oK???
    // default: Date.now,
    timestamps: true,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;