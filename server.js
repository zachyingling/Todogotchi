const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const app = express();
const PORT = process.env.PORT || 3001;
let sess;

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
  resave: false, // false making it so the session is saved to MongoStore whenever the req.session is modified
  saveUninitialized: false, // false making it so the session is saved to db whenever the req.session is modified
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day in milliseconds
  }
}));

app.get("/", (req, res) => {
  // Start session here
  sess = req.session;

  if(sess.email){
    res.send(true); // tells the react router to route to /home route
  } else {
    res.send(false); // tells the react router to route to / route with err message
  }
});

app.post("/create", (req, res) => {
  sess = req.session;

  // \/  Do a db search for req.body.email and req.body.password if its created yet. then create
  sess.email = req.body.email;
  sess.password = req.body.password;

  res.end();
});

app.post("/login", (req, res) => {
  // We can setup this route to make a call to the database to see if the username and password exists, then if it exists login and start the session;
  sess = req.session;

  if(sess.email && sess.password) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post("/logout", (req, res) => {
  // Post route destroys the session connection
  sess = req.session;
  sess.destroy((err) => {
    if (err) {
      return res.send(false);
    }
    res.clearCookie();
    return res.send(true);
  });
});

app.listen(PORT, () => {
  console.log("Listening at:  localhost:" + PORT);
});