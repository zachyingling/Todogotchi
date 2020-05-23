const router = require("express").Router();
const petRoutes = require("./petRoute");
const toDoRoutes = require('./toDoRoute');
const userRoutes = require('./userRoute');

router.use("/pets", petRoutes);
router.use("/todos", toDoRoutes);
router.use("/users", userRoutes);

module.exports = router;
