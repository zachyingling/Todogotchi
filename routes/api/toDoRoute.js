const router = require("express").Router();
const toDoController = require("../../controllers/toDoController");

// Matches with "/api/books"
router.route("/")
  .get(toDoController.findAll)
  .post(toDoController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(toDoController.findById)
  .put(toDoController.update)
  .delete(toDoController.remove);

module.exports = router;
