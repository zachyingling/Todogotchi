const router = require("express").Router();
const userController = require("../../controllers/userController");
const db = require("../../models");
const validator = require("email-validator");
let sess;

router.route("/")
.get(userController.findAll)
.post(userController.create);

router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update);

router.route("/create/:email/:password").post((req, res) => {
  sess = req.params;
  // stuff

  // \/ this validates email (returns true if its an email else returns false if not valid email)
  if(validator.validate(req.params.email)) {
    db.User.find({ email: req.params.email })
      .then(response => {
        if(response.length === 0){
          db.Pet.create({ moodStatus: 8, energyLevel: 10 })
          .then(data => {
            console.log(data);
            db.User.create({ email: req.params.email, password: req.params.password, userPets: data._id }).then(createResponse => {
              sess.email = req.params.email;
              sess.password = req.params.password;
              res.send(sess);
            });

          })

        } else {
          res.send("already")
        }
      });
  } else {
    res.send("!valid");
  }
});


router.route("/login/:email/:password").post((req, res) => {
  sess = req.params;
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

router.route("/logout").post((req, res) => {
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

// app.post("/create/:email/:password", (req, res) => {
//   sess = req.session;

//   // \/ this validates email (returns true if its an email else returns false if not valid email)
//   if(validator.validate(req.params.email)) {
//     db.User.find({ email: req.params.email })
//       .then(response => {
//         if(response.length === 0){
//           db.User.create({ email: req.params.email, password: req.params.password }).then(createResponse => {
//             sess.email = req.params.email;
//             sess.password = req.params.password;
//             res.send(sess);
//           });
//         } else {
//           res.send("already")
//         }
//       });
//   } else {
//     res.send("!valid");
//   }
// });

// app.post("/login/:email/:password", (req, res) => {
//   sess = req.session;
//   db.User.find({ email: req.params.email, password: req.params.password })
//     .then(response => {
//       if(response.length !== 0) {
//         sess.email = req.params.email;
//         sess.password = req.params.password;
//         res.send(sess);
//       } else {
//         res.send("not found");
//       }
//     })
//     .catch(err => console.log(err));
// });

// app.post("/logout", (req, res) => {
//   // Post route destroys the session connection
//   sess = req.session;
//   sess.destroy((err) => {
//     if (err) {
//       return res.send(false);
//     }
//     res.clearCookie();
//     return res.send(true);
//   });
// });

// router.route("/")
// .get(userController.findAll)
// .post(userController.create)

// router.route("/:id")
// .delete(userController.remove);

module.exports = router;