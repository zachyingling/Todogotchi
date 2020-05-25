import axios from "axios";


// routes subject to change depending on how database/models are configured

// unsure about a lot of the data I need to pass/return

export default {
  // Gets user's pet info. unsure if we will be passing id or another identifier of the specific user and their session - objectID and ref*** look at webscraper
  getPetStats: function(id) {
    return axios.get("api/pets/" + id);
  },

  // Updates user's energy stat - unsure what may need to be passed here
  saveEnergy: function(currentEnergy) {
    return axios.post("/api/stats", currentEnergy);
  },

  // Updates user's happiness stat - unsure what to pass here
  saveHappiness: function(id, body) {
    return axios.put("api/pets/" + id, body);
  },

  // Gets user's todo info
  getTodos: function() {
      return axios.get("api/todos");
  },

  // creates new todo for user - unsure what needs to be passed besides id
  saveTodo: function(todoData) {
      return axios.post("api/todos", todoData)
  },

  // newUserTodo: function(newTodo) {
  //   return axios.post("")
  // }

  getUsers: function() {
    return axios.get("api/users");
  },

  updateUser: function(id, body) {
    return axios.put("api/users/" + id, body)
  },

  updateTodo: function(id) {
    return axios.put("api/todos/" + id)
  }, 

};
