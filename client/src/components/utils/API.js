import axios from "axios";


// routes subject to change depending on how database/models are configured

// unsure about a lot of the data I need to pass/return

export default {
  // Gets user's pet info. unsure if we will be passing id or another identifier of the specific user and their session
  getStats: function(id) {
    return axios.get("/api/stats/" + id);
  },

  // Updates user's energy stat - unsure what may need to be passed here
  saveEnergy: function(currentEnergy) {
    return axios.post("/api/stats", currentEnergy);
  },

  // Updates user's happiness stat - unsure what to pass here
  saveHappiness: function(currentHappiness) {
    return axios.post("/api/stats", currentHappiness);
  },

  // Gets user's todo info
  getTodos: function(id) {
      return axios.get("api/todos/" + id);
  },

  // creates new todo for user - unsure what needs to be passed besides id
  saveTodo: function(id, todo) {
      return axios.post("api/todos/" + id)
  }

};
