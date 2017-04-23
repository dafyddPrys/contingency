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

/**
 * POST /
 * will be a delete of a contingency
 */
exports.handleDelete = (req, res) => {
  if (req.body && req.body.id) {
    // Check id belongs to user and delete
    res.locals.user.removeContingency(req.body.id)
      .then(
        () => {
          res.redirect(req.get('referer'));
        },
        (error) => {
          console.error(`Error with remove contingency: ${error}`);
          // TODO flash error message
          res.redirect(req.get('referer'));
        }
      );
  }
};
