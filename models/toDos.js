const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var toDoSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  // todoId: {
  //   type: Schema.Types.ObjectId,
  //   unique: true
  // },
  listItem: {
  	type: String
  },
  completionStatus: {
    type: Boolean
  },
  lastUpdated: {
      type: Date,
      timestamps: true
  }
});
var ToDoList = mongoose.model("ToDoList", toDoSchema);
module.exports = ToDoList;