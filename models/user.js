const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId
  },
  email: {
    type: String,
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

var User = mongoose.model("User", userSchema);

module.exports = User;