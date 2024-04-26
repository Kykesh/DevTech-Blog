// isAuthenticated.js
module.exports = function(req, res, next) {
    if (req.session.logged_in) {
      return next();
    } else {
      res.redirect('/login');
    }
  };
  