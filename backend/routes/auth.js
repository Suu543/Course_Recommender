const express = require("express");
const router = express.Router();

// import validators
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const validate = require("../middleware/validate");

// import from controllers
const {
  register,
  activateRegistration,
  login,
} = require("../controllers/auth");

router.post("/register", validate(userSignupValidator), register);
router.post("/register/activate", activateRegistration);
router.post("/login", validate(userSigninValidator), login);

module.exports = router;
