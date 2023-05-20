var validator = require('validator');
var db = require('../conf/database');

module.exports = {
  usernameCheck: function (req, res, next) {
    var { username } = req.body;
    username = username.trim();
    if (!validator.isLength(username, { min: 3 })) {
      req.flash("error", "Username must be 3 or more characters");
    }
    if (!/[a-zA-Z]/.test(username.charAt(0))) {
      req.flash("error", "Username must begin with a character");
    }
    if (req.session.flash.error) {
      res.redirect('/register');
    } else {
      next();
    }
  },
  passwordCheck: function (req, res, next) {
    var { password, confirmPassword } = req.body;
    if (!validator.isLength(password, { min: 8 })) {
      req.flash("error", "Password must be 8 or more characters");
    }
    if (!/[A-Z]/.test(password)) {
      req.flash("error", "Password must contain at least one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      req.flash("error", "Password must contain at least one digit");
    }
    if (!/[\/*\-+!@#$%^&~\[\]]/.test(password)) {
      req.flash("error", "Password must contain at least one special character");
    }
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
    }
    if (req.session.flash.error) {
      res.redirect('/register');
    } else {
      next();
    }
  },

  emailCheck: function (req, res, next) {
    var { email } = req.body;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      req.flash("error", "Invalid email address");
    }
    if (req.session.flash.error) {
      res.redirect('/register');
    } else {
      next();
    }
  },

  isUsernameUnique: async function (req, res, next) {
    var { username } = req.body;
    try {
      var [rows, fields] = await db.execute(
        `SELECT id from users where username=?;`,
        [username]
      );
      if (rows && rows.length > 0) {
        req.flash("error", `${username} is already taken`);
        return req.session.save(function (err) {
          return res.redirect('/register');
        });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },
  isEmailUnique: async function (req, res, next) {
    var { email } = req.body;
    try {
      var [rows, fields] = await db.execute(
        `SELECT id from users where email=?;`,
        [email]
      );
      if (rows && rows.length > 0) {
        req.flash("error", `${email} is already taken`);
        return req.session.save(function (err) {
          return res.redirect("/register");
        });
      } else {
        next();
      }
    }
    catch (error) {
      next(error);
    }
  }
}