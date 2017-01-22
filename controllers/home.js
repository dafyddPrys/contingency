const passportConfig = require('../config/passport');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  const isAuthed = passportConfig.isAuthenticatedBool(req);
  if (isAuthed) {
    res.render('landing', {
    });
  } else {
    res.render('home', {
      title: 'Home',
    });
  }
};
