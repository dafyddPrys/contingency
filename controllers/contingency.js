/**
 * Controller for all things making and breaking
 * contingencies.
 */

const moment = require('moment');

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
    date: moment({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
    time: moment(),
  });
};

exports.postNewWebhook = (req, res) => {
  // TODO turn post data into new form.
  res.render('contingencies/confirm');
};
