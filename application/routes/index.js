var express = require('express');
var router = express.Router();
var { isLoggedIn } = require('../middleware/auth');
const { buildNavBar, buildMenu, buildFooter } = require("../middleware/build");
const { getRecentPosts } = require('../middleware/posts');

/* GET home page. */
router.get('/', getRecentPosts, buildNavBar, buildMenu, buildFooter, async function(req,res, next){
  res.render('index', { 
   css: ["index-style.css"],
   js: ["menu.js"],
   pageTitle: 'Home',
   posts: res.locals.posts
   });
 });

router.get("/register", buildNavBar, buildFooter, async function(req, res, next) {
  res.render('register', {
    css: ["register-style.css"],
    js: ["menu.js", "reg-valid.js"],
    pageTitle: 'Registration'
  });
})

router.get("/login", buildNavBar, buildFooter, async function(req, res, next) {
  res.render('login', {
    css: ["login-style.css"],
    js: ["menu.js"],
    pageTitle: 'Login'
  });
})

router.get("/viewpost", buildNavBar, buildMenu, buildFooter, async function(req,res,next) {
  res.render('viewpost', {
    css: ["viewpost-style.css"],
    font: ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"],
    js: ["menu.js", "viewpost.js"],
    pageTitle: `Post Dashboard`,    
  });
})

router.get("/postvideo", isLoggedIn, buildNavBar, buildMenu, buildFooter, async function(req, res, next) {
  res.render('postvideo', {
    css: ["postvideo-style.css"],
    js: ["menu.js"],
    pageTitle: 'MeTube Studio'
  });
})

router.get('/logout', buildFooter, async function(req, res, next) {
  res.render('logout', {
    css: ["logout-style.css"],
    font: ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"],
    pageTitle: 'Log Out'
  });
})
module.exports = router;
