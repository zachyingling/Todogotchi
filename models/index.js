const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  User: require("./user"),
  ToDoList: require("./toDos"),
  Pet: require("./pet")
};
  