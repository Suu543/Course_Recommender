const express = require("express");
const router = express.Router();

// Validators
const validate = require("../middleware/validate");

const {
  categoryCreateValidator,
  categoryUpdateValidator,
} = require("../validators/category");

// Controllers
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/category");

// routes
router.get("/categories", list);
router.post("/category/:slug", read);
router.post(
  "/category",
  validate(categoryCreateValidator),
  requireSignin,
  adminMiddleware,
  create
);
// router.post("/category", requireSignin, adminMiddleware, create);
router.put(
  "/category/:id",
  validate(categoryUpdateValidator),
  requireSignin,
  adminMiddleware,
  update
);
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
