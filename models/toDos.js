const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ToDoSchema = new Schema({
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
var ToDoList = mongoose.model("ToDoList", ToDoSchema);

module.exports = ToDoList;