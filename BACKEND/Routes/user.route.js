const express = require("express");
const bookingUserController = require("../Controllers/user.controller");

const router = express.Router();

router.post("/register", bookingUserController.create);
router.get("/all", bookingUserController.getAll);
router.get("/:id", bookingUserController.getUserById);
router.post("/login", bookingUserController.login);
router.put("/:id", bookingUserController.update);
router.delete("/:id", bookingUserController.delete);

module.exports = router;
