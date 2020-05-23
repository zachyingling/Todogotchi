const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const validator = require("email-validator");
const app = express();
const PORT = process.env.PORT || 3001;
const logger = require("morgan");
const routes = require("./routes");
const db = require("./models");

let sess;

const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

// app.use(app.router);
// routes.initialize(app);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todo_db";


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//dbString
const connection = mongoose.createConnection(MONGODB_URI, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger("dev"));
//broke when i inserted this: 
// app.use(routes);

mongoose.connect(MONGODB_URI, dbOptions);
mongoose.Promise = Promise;

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

app.use(routes);

app.listen(PORT, () => {
  console.log("Listening at:  localhost:" + PORT);
});

// //this should be where we set a timer to refresh the database 
// router.post('/updateData', (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// this is our create methid
// this method adds new data in our database
// router.post('/putData', (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: 'INVALID INPUTS',
//     });
//   }
// })