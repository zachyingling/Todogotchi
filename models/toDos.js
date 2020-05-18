const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
  userId: {
    type: Number,
    required: true
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
const ToDoList = mongoose.model("ToDoList", toDoSchema);

module.exports = ToDoList;