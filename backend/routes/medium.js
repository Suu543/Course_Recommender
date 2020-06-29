const express = require("express");
const router = express.Router();

// Validators
const validate = require("../middleware/validate");
const {
  mediumCreateValidator,
  mediumUpdateValidator,
} = require("../validators/medium");

// Auth
const { requireSignin, adminMiddleware } = require("../controllers/auth");

// Controllers
const { create, read, update, remove } = require("../controllers/medium");

// routes
router.get("/mediums", read);
router.post(
  "/medium",
  validate(typeCreateValidator),
  requireSignin,
  adminMiddleware,
  create
);
router.put(
  "/medium/:id",
  validate(typeUpdateValidator),
  requireSignin,
  adminMiddleware,
  update
);
router.delete("/medium/:id", requireSignin, adminMiddleware, remove);
