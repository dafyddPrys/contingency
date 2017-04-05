/**
 * Controller for all things making and breaking
 * contingencies.
 */

const moment = require('moment');
const Contingency = require('../models/Contingency');

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
  console.log(req.user);
  res.render('contingencies/newWebhook', {
    date: moment({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
  });
};

exports.handleNewWebhook = (req, res) => {
  req.body.fromTime = moment(req.body.date);
  Contingency
    .create(req.body, (err, contingency) => {
      console.log('saved');

      if (err) {
        console.log('error was:');
        console.log(err);
        res.render('contingencies/newWebhook');
        return;
      }

      // Save the contingency to the user's list
      req.user.addContingency(contingency.id)
        .then(
          contingency => res.render('contingencies/confirm', contingency),
          () => res.render('contingencies/newWebhook')
        );

      // res.redirect(302, 'contingencies/confirm');
    });
};
