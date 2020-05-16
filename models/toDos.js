const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  userId: {
  	type: Int
  }, 
  listItem: {
  	type: String
  },
  completionStatus: {
    type: Boolean
  },
  lastUpdated: {
      type: timestamp
  }
});
const ToDoList = mongoose.model("ToDoList", ToDoSchema);

module.exports = ToDoList;