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
  res.render('contingencies/newWebhook', {
    date: moment({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
  });
};

exports.handleNewWebhook = (req, res) => {
  // TODO turn post data into new form.
  console.log('Got new webhook request');
  console.log(req.body);

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

      // res.redirect(302, 'contingencies/confirm');
      res.render('contingencies/confirm', contingency);
    });
};
