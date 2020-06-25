const express = require("express");
const router = express.Router();

// import middlewares
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

// import controllers
const { read, likes } = require("../controllers/user");

// routes
router.get("/user", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);
router.post("/user/likes/:id", likes);

module.exports = router;
