const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var toDoSchema = new Schema({
  userId: {
    type: Number
  }, 
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