const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // user:{
  //   type: String,
  //   required: true,
  //   unique: { index: { unique: true } }
  // },
  email: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  password: {
    type: String
  },
  login: {
    type: Date,
    default: Date.now,
    timestamps: true,
    required: true
  }
});
//use this to create a unique object id???
// schema.path('_id'); 
const User = mongoose.model("User", userSchema);
module.exports = User;