var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();
var db = require('../conf/database');

router.post('/create', isLoggedIn, async function (req, res, next) {
  var { userId, username } = req.session.user;
  var { postId, comment } = req.body;

  try {
    var [insertResult, fields] = await db.execute(
      `INSERT INTO comments (text, fk_postId, fk_authorId) VALUES (?, ?, ?)`,
      [comment, postId, userId]
    );
    if (insertResult && insertResult.affectedRows == 1) {
      return res.status(201).json({
        commentId: insertResult.insertId,
        username: username,
        commentText: comment
      });
    } else {
      // Handle if the comment couldn't be inserted
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;