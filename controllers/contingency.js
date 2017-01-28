/**
 * Controller for all things making and breaking
 * contingencies.
 */

/**
 * Create a new contingency
 */
exports.new = (req, res) => {
  res.render('contingencies/new');
};

exports.newEmail = (req, res) => {
  res.render('contingencies/newEmail');
};

exports.newWebhook = (req, res) => {
  res.render('contingencies/newWebhook');
};
