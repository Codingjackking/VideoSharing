var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require('../conf/database');


module.exports = {
  makeThumbnail: function (req, res, next) {
    if (!req.file) {
      next(new Error("File upload failed"));
    } else {
      try {
        var destinationOfThumbnail = `public/images/uploads/thumbnail-${req.file.filename.split(".")[0]
          }.png`;
        var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.
          file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}
              `;
              exec(thumbnailCommand, function(error, stdout,stderr){
                if(error) next(error);
                  req.file.thumbnail = destinationOfThumbnail;
                  next();
                });
      } catch (error) {
        next(error);
      }
    }
  },

  //getPostsForUserBy --> gets all post a user made for their profile,
  getPostsForUserBy: async function (req, res, next) {
    const userId = req.session.user.userId;
    try {
      const [rows, fields] = await db.execute(
        `SELECT * FROM posts WHERE fk_userId = ?`,
        [userId]
      );
      const posts = rows.map(post => ({
        postId: post.id,
        video: post.video,
        thumbnail: post.thumbnail,
        createdAt: post.createAt
      }));
      res.locals.posts = posts;
      next();
    } catch (error) {
      next(error);
    }
  },

  //getPostById --> gets post information for a post given a postId( for viewpost).
  getPostById: async function (req, res, next) {
    var { id } = req.params;
    try {
      const [rows, fields] = await db.execute(
        `SELECT u.username, p.video, p.title, p.description, p.id, p.createdAt 
        FROM posts p 
        JOIN users u
        ON p.fk_userId=u.id
        WHERE p.id=?;`,
        [id]
      );
      const post = rows[0];
      if (!post) {
      } else {
        res.locals.currentPost = post;
        next();
      }
    } catch (error) {
      next(error);
    }
  },

  //getCommentsForPostById --> gets all comments for a post given a postId (for viewpost),
  getCommentsForPostById: async function (req, res, next) {
    var { id } = req.params;
    try {
      const [rows, _] = await db.execute(
        `SELECT u.username, c.text, c.createdAt 
        FROM comments c 
        JOIN users u
        ON c.fk_authorId=u.id
        WHERE c.fk_postId=?;`,
        [id]
      );
      res.locals.currentPost.comments = rows;
      next();
    } catch (error) {
      next(error);
    }
  },

  //Home Page
  getRecentPosts: async function (req, res, next) {
    try {
      const [rows, fields] = await db.execute(`SELECT p.*, u.username FROM posts p JOIN users u ON p.fk_userId = u.id ORDER BY p.createdAt DESC LIMIT 10`);
      const posts = rows.map(post => ({
        postId: post.id,
        title: post.title,
        description: post.description,
        video: post.video,
        thumbnail: post.thumbnail,
        username: post.username,
        userId: post.fk_userId,
        createdAt: post.createdAt
      }));
      res.locals.posts = posts;
      next();
    } catch (error) {
      next(error);
    }
  }
  
}
