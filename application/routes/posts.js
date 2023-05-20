var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var db = require('../conf/database');
var { isLoggedIn, isMyProfile } = require('../middleware/auth');
var { makeThumbnail, getPostById, getCommentsForPostById } = require('../middleware/posts');
const { buildNavBar, buildMenu, buildFooter } = require('../middleware/build');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/videos/uploads");
  },
  filename: function (req, file, cb) {
    var fileExt = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
  },
});

const upload = multer({ storage: storage });


router.post(
  "/create",
  isLoggedIn,
  upload.single("uploadVideo"),
  makeThumbnail,
  async function (req, res, next) {
    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { userId } = req.session.user;
    try {
      var [insertResult, _] = await db.execute(
        `INSERT INTO posts (title, description, video, thumbnail, fk_userId) VALUE(?,?,?,?,?)`,
        [title, description, path, thumbnail, userId]
      );
      if (insertResult && insertResult.affectedRows) {
        req.flash("success", "Your post was created!");
        return req.session.save(function (error) {
          setTimeout(() => {
            if (error) next(error);
            return res.redirect(`/`);
          });
        }, 2000);
      } else {
        next(new Error('Post could not be created'));
      }
    } catch (error) {
      next(error);
    }
  });

router.get("/:id(\\d+)", getPostById, getCommentsForPostById, buildNavBar, buildMenu, buildFooter, function (req, res) {
  res.render('viewpost', {
    css: ["viewpost-style.css"],
    font: ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"],
    js: ["menu.js", "viewpost.js"],
    pageTitle: `Post Dashboard`,
    //posts: res.locals.posts
  });
})


router.get('/search', buildNavBar, buildMenu, buildFooter, async function (req, res, next) {
  var { title } = req.query;
  try {
    var [rows, fields] = await db.execute(`select id, title, thumbnail, video, description, createdAt,
      concat_ws(' ', title, description) 
      as haystack from posts having haystack like ?;`,
      [`%${title}%`]);
    const posts = rows.map(post => ({
      postId: post.id,
      title: post.title,
      description: post.description,
      video: post.video,
      thumbnail: post.thumbnail,
      createdAt: post.createdAt
    }));
    res.locals.posts = posts;
    if (posts && posts.length == 0) {
      req.flash("error", `${title} not found`);
      return req.session.save(function (err) {
        return res.redirect("/");
      });
    }
    else {
      res.render('index', {
        css: ["index-style.css"],
        js: ["menu.js"],
        pageTitle: 'Home',
      }
      );
    }

  }
  catch (error) {
    next(error);
  }
});

router.post('/delete/:id(\\d+)', isLoggedIn, async function (req, res, next) {
  const postId = req.params.id;
  try {
    // Check if the logged-in user is the owner of the post
    const [postRows, fields] = await db.execute(
      'SELECT * FROM posts WHERE id = ? AND fk_userId = ?',
      [postId, req.session.user.userId]
    );
    if (postRows.length === 0) {
      // Post not found or user is not the owner
      return res.status(404).send('Post not found or user is not the owner.');
    }

    // Retrieve the video and thumbnail paths
    const post = postRows[0];
    const videoPath = post.video;
    const thumbnailPath = post.thumbnail;

    // Check if the post has associated comments
    const [commentRows, _] = await db.execute(
      'SELECT * FROM comments WHERE fk_postId = ?',
      [postId]
    );

    // Delete comments associated with the post
    if (commentRows.length > 0) {
      await db.execute('DELETE FROM comments WHERE fk_postId = ?', [postId]);
    }

    // Delete the video and thumbnail files from the file system
    fs.unlink(videoPath, (err) => {
      if (err) {
        console.error(`Failed to delete video file: ${err}`);
      }
    });

    fs.unlink(thumbnailPath, (err) => {
      if (err) {
        console.error(`Failed to delete thumbnail file: ${err}`);
      }
    });

    // Delete the post from the database
    await db.execute('DELETE FROM posts WHERE id = ?', [postId]);

    // Redirect the user to their profile page
    res.redirect(`/users/profile/${req.session.user.userId}`);
  } catch (error) {
    next(error);
  }
});


/*
// GET request for edit form
router.get('/edit/:id(\\d+)', async function(req, res, next) {
  const postId = req.params.id;
  try {
    // Check if the logged in user is the owner of the post
    const [rows, fields] = await db.execute(
      'SELECT * FROM posts WHERE id = ? AND fk_userId = ?',
      [postId, req.session.user.userId]
    );
    if (rows.length === 0) {
      // Post not found or user is not the owner
      return res.status(404).send('Post not found or user is not the owner.');
    }
    // Render the edit form
    res.render('edit', { post: rows[0] });
  } catch (error) {
    next(error);
  }
});
 
// POST request for edit form
router.post('/edit/:id(\\d+)', async function(req, res, next) {
  const postId = req.params.id;
  const { caption } = req.body;
  try {
    // Check if the logged in user is the owner of the post
    const [rows, fields] = await db.execute(
      'SELECT * FROM posts WHERE id = ? AND fk_userId = ?',
      [postId, req.session.user.userId]
    );
    if (rows.length === 0) {
      // Post not found or user is not the owner
      return res.status(404).send('Post not found or user is not the owner.');
    }
    // Update the post caption in the database
    await db.execute('UPDATE posts SET caption = ? WHERE id = ?', [caption, postId]);
    // Redirect the user to their profile page
    res.redirect(`/users/profile/${req.session.user.userId}`);
  } catch (error) {
    next(error);
  }
});
*/


module.exports = router;