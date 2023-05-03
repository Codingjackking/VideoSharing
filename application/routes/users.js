var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
/* GET users listing. */
/*
router.get('/', async function(req, res, next) {
    try {
      let [rows, fields] = await db.query(`select *from users;`
      );
      res.status(200).json({rows,fields});
    }
    catch(error) {
      next(error);
    }
});
*/

function buildNavBar(req, res, next){
  const isLoggedIn = req.session.user;
  res.locals.navLinks = [
  { text: "Home", link: "/" },
  { text: "Browse", link: "/viewpost" },
  { text: "MeTube Studio", link: "/postvideo" },
  { text: "Profile", link: "/profile" }
  ];
  if (isLoggedIn) {
  navLinks.splice(1, 0, { text: "Register", link: "/register" });
  }
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

const checkUserExists = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    var [users, fields] = await db.execute(
      `SELECT id FROM csc317db.users WHERE username=? AND email = ? AND password=?`,
      [username, email, password]
    );
    if (users.length > 0) {
      return next();
    }
    console.log("Invalid username or password");
    return res.redirect('/login');
  } catch (error) {
    next(error);
    console.error(error);
  }
};

router.post('/register', checkUserExists, async function(req, res, next) {
  var { username, email, password} = req.body;
  try {
    var hasedpassword = await bcrypt.hash(password, 3);
    var [resultObject, fields] = await db.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`,
      [username, email, hasedpassword]
    );
    if (resultObject && resultObject.affectedRows == 1) {
      res.redirect('/login');
    } else {
      return res.redirect('/register');
    }
  } catch (error) {
    next(error);
  }
});


router.post('/login', async function(req,res, next) {
  var {username, password} = req.body;
  if (!username || !password) {
    return res.redirect("/login");
  }
  else {    
    var[users,fields] = await db.execute(
      `SELECT id,username,password,email FROM csc317db.users where username=?;`,
      [username]);
      var user = users[0];
      if (!user) {
        return res.redirect("/login");
      } else {
        var passwordsMatch = await bcrypt.compare(password, user.password)
        if (passwordsMatch) {
          req.session.user = {
            userId: user.id,
            email: user.email,
            username: user.username
          };
        return res.redirect("/");
        }
        else {
          return res.redirect("/login");
        }
      }
    }
  });
  router.get('/', buildNavBar, buildFooter, async function(req,res, next){
    res.render('index', { 
     css: ["index-style.css"],
     js: ["menu.js", "photo.js"],
     pageTitle: 'Home',
     });
   });

  router.get('/profile', buildNavBar, buildFooter, async function(req, res, next) {
      if (!req.session.user) {
        return res.redirect('/login');
      }
      try {  
        var [users, fields] = await db.execute(
        'SELECT username, email FROM csc317db.users WHERE id = ?',
        [id]
      );
      var user = users[0];
      res.render('profile', { 
        username: user.username,
        email: user.email,
        css: ["profile-style.css"],
        js: ["menu.js","profile.js"],
        pageTitle: 'User Profile',
      });
    } catch (error) {
      next(error);
    }
  });

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

module.exports = router;
/*
router.get('/viewpost/:id(\\d+)', buildNavBar, buildFooter, function(req, res, next) {
  const postId = req.params.id;
  res.render('viewpost', {
    css: ["viewpost-style.css"],
    js: ["menu.js"],
    postId: postId,
    pageTitle: 'View Post',
    logoText: "MeTube",
    footerText: "© Naing Htet 2023. All rights reserved."
  });
})
*/