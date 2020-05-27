const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
  },
  elapsedTime: {
    type: Number,
    default: 0
  },
  // record last logout through API call in componentWillMount in PetWindow component.
  // lastLogout: {
  //   type: Date,
  //   default: Date.now,
  //   timestamps: true,
  //   required: true
  // },
  userToDos: [
    {
    type: Schema.Types.ObjectId,
      ref: "ToDoList"
    }
  ]
  ,
  userPets: [
    {
    type: Schema.Types.ObjectId,
      ref: "Pet"
    }
  ]
  ,
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function(inputPassword, encryptedPassword) {
  return bcrypt.compare(inputPassword, encryptedPassword);
};
//use this to create a unique object id???
// schema.path('_id'); 
const User = mongoose.model("User", userSchema);
module.exports = User;