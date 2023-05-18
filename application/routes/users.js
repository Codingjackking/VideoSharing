var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
var { isLoggedIn, isMyProfile } = require("../middleware/auth");
var { isUsernameUnique, usernameCheck, passwordCheck, emailCheck, isEmailUnique } = require("../middleware/validation");
const { buildNavBar, buildMenu, buildFooter } = require("../middleware/build");
var { getPostsForUserBy } = require("../middleware/posts");

router.post(
  "/register",
  usernameCheck,
  passwordCheck,
  emailCheck,
  isUsernameUnique,
  isEmailUnique, 
  async function (req, res, next) {
    var { username, email, password } = req.body;
    try {
      var hashedpassword = await bcrypt.hash(password, 3);

      var [resultObject, fields] = await db.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`,
      [username, email, hashedpassword]
    );
      if (resultObject && resultObject.affectedRows == 1) {
        req.flash("success", `Registration Successful! Please login to continue.`);
        res.redirect('/login');
    } else {
        req.flash("error", `Registration failed. Please try again.`);
        return res.redirect('/register');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/login', async function (req, res, next) {
  var { username, password } = req.body;
  if (!username || !password) {
    return res.redirect("/login");
  }
  else {
    var [users, fields] = await db.execute(
      `SELECT id,username,password,email FROM users where username=?;`,
      [username]);
    var user = users[0];
    if (!user) {
      req.flash("error", `Log In Failed: Invalid username/password`);
      req.session.save(function (err) {
        return res.redirect("/login");
      })
    }
    else {
      var passwordsMatch = await bcrypt.compare(password, user.password)
      if (passwordsMatch) {
        req.session.user = {
          userId: user.id,
          email: user.email,
          username: user.username
        };
        req.flash("success", `You are now logged in`);
        req.session.save(function (err) {
          return res.redirect("/");
        })
      }
      else {
        return res.redirect("/login");
      }
    }
  }
});

router.post("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err);
    }
    return res.redirect('/logout');
  })
});

router.get("/profile/:id(\\d+)", 
isLoggedIn, 
isMyProfile, 
getPostsForUserBy, 
buildNavBar, 
buildMenu, 
buildFooter, 
async function(req, res, next) {  
    res.render('profile', {
      css: ['profile-style.css'],
      js: ['menu.js'],
      pageTitle: 'Profile',
      posts: res.locals.posts
    });
  })

router.use('/postvideo', function (req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    req.flash("error", `You need to be logged in to gain access.`);
    return res.redirect('/login');
  }
});

router.use('/viewpost', function (req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    req.flash("error", `You need to be logged in to gain access.`);
    return res.redirect('/login');
  }
});
module.exports = router;
