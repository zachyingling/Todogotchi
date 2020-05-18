const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
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
      timestamps: true,
      required: true
  }
});
const ToDoList = mongoose.model("ToDoList", ToDoSchema);

module.exports = ToDoList;