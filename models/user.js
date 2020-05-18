const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _userId:{
    type: Number,
    required: true,
    unique: true
//use this instead????
    // type: mongoose.Schema.Types.ObjectId
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

schema.path('_id'); 

const User = mongoose.model("User", userSchema);

module.exports = User;