const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  userId:{
    type: Number,
    required: true,
//use this instead????
    // type: mongoose.Schema.Types.ObjectId
  },
  email: {
    type: String,
  },
  password: {
    type: String
  },
  login: {
    type: Date,
    //formerly date.now, is this change oK???
    // default: Date.now,
    timestamps: true
  }
});

//use this to create a unique object id???
// schema.path('_id'); 

var User = mongoose.model("User", userSchema);

module.exports = User;