var express = require('express');
var router = express.Router();

/* GET home page. */
function buildNavBar(req,res,next){
  res.locals.navLinks =  [
    { text: "Home", link: "index" },
    { text: "Login", link: "login" },
    { text: "Register", link: "registration" },
    { text: "Browse", link: "viewpost" },
    { text: "MeTube Studio", link: "postvideo" },
    { text: "Profile", link: "profile" }
  ],
  next();
}

function buildFooter(req,res,next){
  res.locals.footerLinks =  [
    { text: "Term of Service", link: "#" },
    { text: "About US", link: "#" },
    { text: "Privacy Notice", link: "#" },
    { text: "Help", link: "#" }
  ],
  next();
}

router.get('/index', buildNavBar, buildFooter, function(req,res){
 res.render('index', { 
  css: ["index-style.css"],
  js: ["menu.js", "photo.js"],
  pageTitle: 'Home',
  logoText: "MeTube",
  footerText: "Copyright © Naing Htet 2023. All rights reserved."
  });
});

router.get("/login", buildNavBar, buildFooter, function(req, res) {
  res.render('login', {
    css: ["login-style.css"],
    js: ["menu.js"],
    pageTitle: 'Login',
    logoText: "MeTube",
    footerText: "Copyright © Naing Htet 2023. All rights reserved."
  });
})

router.get("/postvideo", buildNavBar, buildFooter, function(req, res, next) {
  res.render('postvideo', {
    css: ["postvideo-style.css"],
    js: ["menu.js"],
    pageTitle: 'MeTube Studio',
    logoText: "MeTube",
  footerText: "Copyright © Naing Htet 2023. All rights reserved."
  });
})
router.get('/viewpost', buildNavBar, buildFooter, function(req, res, next) {
  res.render('viewpost', {
    css: ["viewpost-style.css"],
    js: ["menu.js"],
    pageTitle: 'View Post',
    logoText: "MeTube",
    footerText: "Copyright © Naing Htet 2023. All rights reserved."
  });
})

router.get("/profile", buildNavBar, buildFooter, function(req, res, next) {
  res.render('profile', {
    css: ["profile-style.css"],
    js: ["menu.js"],
  pageTitle: 'User Profile',
  logoText: "MeTube",
  footerText: "Copyright © Naing Htet 2023. All rights reserved."
  });
})

router.get("/registration", buildNavBar, buildFooter, function(req, res, next) {
  res.render('registration', {
    css: ["register-style.css"],
    js: ["menu.js", "reg-valid.js"],
    pageTitle: 'Registration',
  logoText: "MeTube",
  footerText: "Copyright © Naing Htet 2023. All rights reserved."
  });
})

module.exports = router;
