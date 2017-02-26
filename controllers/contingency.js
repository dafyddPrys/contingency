/**
 * Controller for all things making and breaking
 * contingencies.
 */

const nowDate = 

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
  res.render('contingencies/newWebhook', {
    nowDate: new Date().toISOString().slice(0, 10),
  });
};

exports.postNewWebhook = (req, res) => {
  // TODO turn post data into new form.
  res.render('contingencies/confirm');
};
