const express = require("express");
const session = require("express-sessions");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

var app = express();
const PORT = process.env.PORT || 3001;

const dbString = process.env.MONGODB_URI || "mongodb://localhost/todo_db";
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "Users"
});

app.use(session({
  secret: "idk what this is",
  resave: false, 
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (tbh idk the math)
  }
}));

app.listen(PORT, () => {
  console.log("Listening at:  localhost:" + PORT);
});