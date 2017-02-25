/**
 * Schedule service - Checks every minute to see if any triggers are activated.
 */

// Vendor modules
const schedule = require('node-schedule');
const moment = require('moment');
const chalk = require('chalk');

// Our modules
const Contingency = require('../models/Contingency');


/**
 * Start the scheduler. Run every minute.
 * Export so we can control it.
 */
console.log(chalk.blue('Starting schedule.'));
exports.job = schedule.scheduleJob('* * * * *', () => {
  const now = moment();
  now.set({ second: 0, millisecond: 0 });

  Contingency.findTriggersForTime(now)
    .then(
      (triggers) => {
        console.log('Got some triggers: ', triggers);
      },
      (error) => {
        console.log('Got an error: ', error);
      }
    );
});
