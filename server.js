const express = require("express");
const session = require("express-session");
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
  collection: "sessions"
});

app.use(session({
  secret: "some secret",
  resave: false, 
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day in milliseconds
  }
}));

app.get("/", (req, res) => {
  // Start session here
  res.end();
});

app.post("/create", (req, res) => {
  // We can setup this route to make a new account; tests to see if the username/email exists in the database; if the username/email doesn't exist create account else tell user that you can't use username/email
});

app.post("/login", (req, res) => {
  // We can setup this route to make a call to the database to see if the username and password exists, then if it exists login and start the session;
});

app.post("/logout", (req, res) => {
  // Post route destroys the session connection
  req.session.destroy((err) => {
    if (err) {
      return res.send(false);
    }
    res.clearCookie("project2");
    res.send(true);
  });
});

app.listen(PORT, () => {
  console.log("Listening at:  localhost:" + PORT);
});