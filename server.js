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
// app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todo_db";

mongoose.connect(MONGODB_URI, dbOptions);
mongoose.Promise = Promise;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//dbString
const connection = mongoose.createConnection(MONGODB_URI, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger("dev"));
//broke when i inserted this: 
app.use(routes);

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
// \/ These create something in the collections but pets is there with nothing
// db.User.create({password: "test", email: "test"}).then(response=> {
//   console.log(response);
// }).catch(err => console.log(err));

// db.ToDoList.create({userId: "129831"}).then(response=> {
//   console.log(response);
// }).catch(err => console.log(err));

// app.get("/", (req, res) => {
//   // Start session here
//   sess = req.session;

//   if(sess.email){
//     res.send(sess); // tells the react router to route to /home route
//   } else {
//     res.send(false); // tells the react router to route to / route with err message
//   }
// });

app.post("/create/:email/:password", (req, res) => {
  sess = req.session;

  // \/ this validates email (returns true if its an email else returns false if not valid email)
  if(validator.validate(req.params.email)) {
    db.User.find({ email: req.params.email })
      .then(response => {
        if(response.length === 0){
          db.User.create({ email: req.params.email, password: req.params.password }).then(createResponse => {
            sess.email = req.params.email;
            sess.password = req.params.password;
            res.send(sess);
          });
        } else {
          res.send("already")
        }
      });
  } else {
    res.send("!valid");
  }
});

app.post("/login/:email/:password", (req, res) => {
  sess = req.session;
  db.User.find({ email: req.params.email, password: req.params.password })
    .then(response => {
      if(response.length !== 0) {
        sess.email = req.params.email;
        sess.password = req.params.password;
        res.send(sess);
      } else {
        res.send("not found");
      }
    })
    .catch(err => console.log(err));
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