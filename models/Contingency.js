
const mongoose = require('mongoose');
const moment = require('moment');

// const frequencyEnum = {
//   day: 'day',
//   week: 'week',
//   'second-week': 'second-week',
//   month: 'month',
//   year: 'year'
// };


const contingencySchema = new mongoose.Schema({
  type: 'webhook',
  isEnabled: {
    type: Boolean,
    required: true,
    default: true,
  },
  checkedIn: {
    type: Boolean,
    default: false,
    required: true,
  },
  frequency: { // the number of milliseconds in the frequency.
    type: Number,
    required: true
  },
  fromTime: {
    type: Date,
    required: true
  },
  nextTriggerTime: {
    type: Date,
    required: true,
  },
  webhookUrl: {
    type: String,
    required: true,
    // TODO custom validator here for url regex
  },
  webhookBody: {
    type: {},
    required: true
  }

});


/**
 * Validation methods
 * ------------------------------------------------------------------
 */


/**
 * Instance methods
 * ------------------------------------------------------------------
 */

/**
 * Move a next trigger time onto the next trigger time
 */
contingencySchema.methods.tickNextTriggerTime = function tickNextTriggerTime() {
  // if the nextTriggerTime is in the past, move it on and save the contingency.
  // return a promise of the save.
  if (moment(this.nextTriggerTime) < moment()) {
    this.nextTriggerTime = moment(this.nextTriggerTime).add(this.frequency, 'ms');
    return this.save.exec();
  }
  // otherwise, return a n empty resolved promise.
  return Promise.resolve();
};

/**
 * Static methods
 * ------------------------------------------------------------------
 */

/**
 * Get all contingencies which have the given time as their next trigger time.
 */
contingencySchema.statics.findTriggersForTime = function findTriggersForTime(time) {
  return this
    .find({
      nextTriggerTime: time
    })
    .exec();
};


/**
 * Create and export model
 * ------------------------------------------------------------------
 */

const Contingency = mongoose.model('Contingency', contingencySchema);
module.exports = Contingency;
