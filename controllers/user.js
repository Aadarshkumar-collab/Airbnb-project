const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    //res.send("form");
    res.render("users/signup");
};

module.exports.signup = (async(req, res) => {
    try{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if(err){
            return next(err);
        }
    req.flash("success", "Welcome to Wandelust");
    res.redirect("/listings");
    });
    
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
})

//user login 
module.exports.loginRoute = (req, res) => {
    res.render("users/login.ejs");
};

//post login
module.exports.postLoginRoute = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust you are logged in!");
   let redirectUrl = res.locals.redirectUrl || "/listings";
   res.redirect(redirectUrl);
    };

//logout route
module.exports.logoutRoute = (req, res, next) => {
    req.logOut( (err) =>{ 
    if(err){
        return next(err)
    }
    req.flash("success", "You are logged out")
    res.redirect("/listings");
    });
}