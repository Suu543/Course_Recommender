const express = require("express");
const router = express.Router();

// import validators
const { userSignupValidator } = require("../validators/auth");
const validate = require("../middleware/validate");

// import from controllers
const { register, activateRegistration } = require("../controllers/auth");

router.post("/register", validate(userSignupValidator), register);
router.post("/register/activate", activateRegistration);

module.exports = router;
