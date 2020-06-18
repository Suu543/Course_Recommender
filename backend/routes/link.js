const express = require("express");
const router = express.Router();

// Validators
const validate = require("../middleware/validate");

const {
  linkCreateValidator,
  linkUpdateValidator,
} = require("../validators/link");

// Controllers
const { requireSignin, authMiddleware } = require("../controllers/auth");
const { create, list, read, update, remove } = require("../controllers/link");

// routes
router.get("/links", list);
router.get("/link/:slug", read);
router.post(
  "/link",
  validate(linkCreateValidator),
  requireSignin,
  authMiddleware,
  create
);
router.put(
  "/link/:slug",
  validate(linkUpdateValidator),
  requireSignin,
  authMiddleware,
  create
);
router.delete("/link/:slug", requireSignin, authMiddleware, remove);

module.exports = router;
