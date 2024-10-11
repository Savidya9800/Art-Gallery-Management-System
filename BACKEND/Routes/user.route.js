const express = require("express");
const bookingUserController = require("../Controllers/user.controller");
const { authenticateToken, authorize } = require("../Middlware/authMiddlware");

const router = express.Router();

router.post("/register", bookingUserController.create);
router.get(
  "/all",
  authenticateToken,
  authorize("admin"),
  bookingUserController.getAll
);
router.get(
  "/:id",

  authenticateToken,
  authorize("admin", "user", "artist"),
  bookingUserController.getUserById
);
router.post("/login", bookingUserController.login);
router.put(
  "/:id",
  authenticateToken,
  authorize("admin", "user"),
  bookingUserController.update
);
router.delete(
  "/:id",
  authenticateToken,
  authorize("admin", "user"),
  bookingUserController.delete
);

module.exports = router;
