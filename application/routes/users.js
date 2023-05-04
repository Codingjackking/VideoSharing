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
  res.locals.navLinks =  [
    { text: "Home", link: "/" },
    { text: "Library", link: "/viewpost" },
  ],
  next();
}

function buildMenu(req, res, next) {
  res.locals.links = [
    { text: "MeTube Studio", link: "/postvideo" }
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
/*
router.post('/register', async function(req, res, next) {
  var { username, email, password} = req.body;
  try {
    var [rows, fields] = await db.execute(
      `SELECT id from users where username=?`,
      [username]
    )
    if (rows && rows.length > 0) {
      return res.redirect("/register");
    }
    var [rows, fields] = await db.execute(
      `SELECT id from users where email=?`,
      [email]
    )
    if (rows && rows.length > 0) {
      return res.redirect("/register");
    }
    var hashedpassword = await bcrypt.hash(password, 3);
    var [resultObject, fields] = await db.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`,
      [username, email, hashedpassword]
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
*/

function checkExistingUser(req, res, next) {
  var { username, email } = req.body;
  db.execute(`SELECT id from users where username=? OR email=?`, [username, email])
    .then(([rows, fields]) => {
      if (rows && rows.length > 0) {
        return res.redirect('/register');
      } else {
        next();
      }
    })
    .catch((error) => {
      next(error);
    });
}

router.post('/register', checkExistingUser, async function(req, res, next) {
  var { username, email, password } = req.body;
  try {
    var hashedpassword = await bcrypt.hash(password, 3);
    var [resultObject, fields] = await db.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`,
      [username, email, hashedpassword]
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
      `SELECT id,username,password,email FROM users where username=?;`,
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

  router.post("/logout", function (req, res, next) {
    req.session.destroy(function(err) {
      if (err) {
        next(error);
      }
      return res.redirect('/');
    })
  });

router.get('/', buildNavBar, buildMenu, buildFooter, async function(req,res, next){
    res.render('index', { 
    css: ["index-style.css"],
    js: ["menu.js", "photo.js"],
    pageTitle: 'Home',
  });
})

router.get('/profile/', buildNavBar, buildMenu, buildFooter, function(req,res,next) {
  res.render('profile', {
    css: ["profile-style.css"],
    js: ["menu.js","style.css"],
    pageTitle: 'User Profile',
  });
})

router.get("/postvideo", buildNavBar, buildMenu, buildFooter, async function(req, res, next) {
  res.render('postvideo', {
    css: ["postvideo-style.css"],
    js: ["menu.js"],
    pageTitle: 'MeTube Studio',
  });
})

router.get('/viewpost', buildNavBar, buildMenu, buildFooter, async function(req, res, next) {
  res.render('viewpost', {
    css: ["viewpost-style.css"],
    font: ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"],
    js: ["menu.js", "viewpost.js"],
    pageTitle: `View Post`,
    title: 'Post Dashboard'
  });
})

router.use(function(req, res, next) {
    if (req.session.user) {
      next();
    }
    else {
      return res.redirect('/login');
    }
  });

module.exports = router;
