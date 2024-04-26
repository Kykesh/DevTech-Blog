// dashboardRoutes.js
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');

// GET dashboard page with user's posts
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [Comment],
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
