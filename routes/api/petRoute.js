const router = require("express").Router();
const petController = require("../../controllers/petController");

router.route("/")
.get(petController.findAll)
.post(petController.create);

router
.route("/:id")
.get(petController.findById)
.put(petController.update);
// .delete(petController.remove);

module.exports = router;