const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapaAsync = require("../utils/wrapaAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");


router
.route("/signup")
.get((userController.renderSignupForm))
.post(wrapaAsync (userController.signup));

router
.route("/login")
.get( (userController.loginRoute))
.post(
    saveRedirectUrl,
    passport.authenticate("local", 
        { failureRedirect: "/login",
        failureFlash: true,
        }),
        (userController.postLoginRoute)
    );

router.get("/logout", (userController.logoutRoute));

module.exports = router;