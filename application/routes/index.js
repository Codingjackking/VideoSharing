var express = require('express');
var router = express.Router();
/* GET home page. */
function buildNavBar(req, res, next){
  res.locals.navLinks =  [
    { text: "Home", link: "/" },
    { text: "Register", link: "/register" },
    { text: "Browse", link: "/viewpost" },
    { text: "MeTube Studio", link: "/postvideo" },
    { text: "Profile", link: "/profile" }
  ],
  next();
}

function buildFooter(req, res, next){
  res.locals.footerLinks =  [
    { text: "Term of Service", link: "#" },
    { text: "About US", link: "#" },
    { text: "Privacy Notice", link: "#" },
    { text: "Help", link: "#" }
  ],
  next();
}

router.get('/', buildNavBar, buildFooter, async function(req,res, next){
  res.render('index', { 
   css: ["index-style.css"],
   js: ["menu.js", "photo.js"],
   pageTitle: 'Home',
   });
 });

router.get("/register", buildNavBar, buildFooter, async function(req, res, next) {
  res.render('register', {
    css: ["register-style.css"],
    js: ["menu.js", "reg-valid.js"],
    pageTitle: 'Registration',
  });
})

router.get("/login", buildNavBar, buildFooter, async function(req, res, next) {
  res.render('login', {
    css: ["login-style.css"],
    js: ["menu.js"],
    pageTitle: 'Login',
  });
})

router.get("/profile", buildNavBar, buildFooter, async function(req, res, next) {
  res.render('profile', {
    css: ["profile-style.css"],
    js: ["menu.js"],
    pageTitle: 'User Profile',
  });
})

router.get("/postvideo", buildNavBar, buildFooter, async function(req, res, next) {
  res.render('postvideo', {
    css: ["postvideo-style.css"],
    js: ["menu.js"],
    pageTitle: 'MeTube Studio',
  });
})

router.get('/viewpost/', buildNavBar, buildFooter, async function(req, res, next) {
  res.render('viewpost', {
    css: ["viewpost-style.css"],
    font: ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"],
    js: ["menu.js", "viewpost.js"],
    pageTitle: `View Post`,
    title: 'Post Dashboard'
  });
})

router.get('/viewpost/:id(\\d+)', buildNavBar, buildFooter, async function(req, res, next) {
  res.render('viewpost', {
    css: ["viewpost-style.css"],
    font: ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"],
    js: ["menu.js", "viewpost.js"],
    pageTitle: `View Post ${req.params.id}`,
  });
})

router.get('/logout', buildNavBar, buildFooter, async function(req,res,next) {
  res.render('logout', {
    css: ["logout-style.css"],
    font: ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"],
    js: ["menu.js"],
    message: "You have been logged out"
  });
})


module.exports = router;
