const express = require("express");
const bookingUserController = require("../Controllers/user.controller");
<<<<<<< HEAD
const { authenticateToken, authorize } = require("../Middlware/authMiddlware");
=======
>>>>>>> 53bfd9248a85e0f07094a58f05120bd4d4814e9f

const router = express.Router();

router.post("/register", bookingUserController.create);
<<<<<<< HEAD
router.get(
  "/all",
  authenticateToken,
  authorize("admin"),
  bookingUserController.getAll
);
router.get(
  "/:id",

  authenticateToken,
  authorize("admin", "user"),
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
=======
router.get("/all", bookingUserController.getAll);
router.get("/:id", bookingUserController.getUserById);
router.post("/login", bookingUserController.login);
router.put("/:id", bookingUserController.update);
router.delete("/:id", bookingUserController.delete);
>>>>>>> 53bfd9248a85e0f07094a58f05120bd4d4814e9f

module.exports = router;
