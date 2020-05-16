const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
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
      type: Date
  }
});
const ToDoList = mongoose.model("ToDoList", ToDoSchema);

module.exports = ToDoList;