const passportConfig = require('../config/passport');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  const isAuthed = passportConfig.isAuthenticatedBool(req);
  if (isAuthed) {
    res.locals.user.populateContingencies().then(
      () => {
        console.log(res.locals.user);
        res.render('landing', {});
      },
      error => console.error(error)
    );
  } else {
    res.render('home', {
      title: 'Home',
    });
  }
};
