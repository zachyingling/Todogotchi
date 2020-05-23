const router = require("express").Router();
const petController = require("../../controllers/petController");

router.route("/")
.get(petController.findAll)
.post(petController.create);

router.route("/:id")
.delete(petController.remove);

module.exports = router;