
const mongoose = require('mongoose');
const moment = require('moment');

/**
 * Schema definition
 * ------------------------------------------------------------------
 */

const contingencySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['webhook'],
    default: 'webhook',
    required: true,
  },
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

  // Unique (to the account) for checking in
  name: {
    type: String,
    required: true,
    default: '',
    // TODO validate to make sure the name is unique for the account.
  },

  // For checking in.
  // TODO store this hashed.
  pin: {
    type: Number,
    min: 0,
    max: 999999,
    required: true,
    default: 0,
  },
  frequency: { // the number of milliseconds in the frequency.
    type: String,
    enum: ['day', 'week', 'alt-week', 'month', 'year'],
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
    validate: {
      validator: v => new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi).test(v),
      message: '{VALUE} is not a valid URL.',
    }
  },
  webhookBody: {
    type: {},
    required: true
  }

});

/**
 * Virtual properties
 * ------------------------------------------------------------------
 */

/**
 * Get trigger time making sure seconds and milliseconds are set to 0.
 */
contingencySchema.virtual('standardisedTriggerTime')
  .get(function getVirtual() {
    const time = moment(this.nextTriggerTime);
    time.set({ second: 0, millisecond: 0 });
    console.log('Getting sandardised time: ', time);
    return time;
  });


/**
 * Instance methods
 * ------------------------------------------------------------------
 */

/**
 * Get the frequency in milliseconds.
 * @return {Number} the frequency in milliseconds
 */
contingencySchema.methods.frequencyInMilliseconds = function frequencyInMilliseconds() {
  const map = {
    day: 86400000,
    week: 604800000,
    'alt-week': 1209600000,
    month: 2629746000,
    year: 31556952000
  };
  return map[this.frequency];
};

/**
 * Move a next trigger time onto the next trigger time
 * @return {Promise}
  */
contingencySchema.methods.tickNextTriggerTime = function tickNextTriggerTime() {
  // if the nextTriggerTime is in the past, move it on and save the contingency.
  // return a promise of the save.
  if (moment(this.nextTriggerTime) < moment()) {
    this.nextTriggerTime = moment(this.nextTriggerTime).add(this.frequency, 'ms');
    return this.save.exec();
  }
  // otherwise, return an empty resolved promise.
  return Promise.resolve();
};

/**
 * Check the pin against the inputted pin. Check in and save if valid.
 * @param { Number } user's inputted pin number.
 * @return { Promise } Resolves to check in success / failure.
 */
contingencySchema.methods.checkIn = function checkIn() {
  // Later on we will need a pin for when we do check in by bot.
  // if (pin === this.pin) {
  this.checkedIn = true;
  return this.save.exec();
  // }
  // return Promise.reject('incorrect pin');
};

/**
 * Static methods
 * ------------------------------------------------------------------
 */

/**
 * Get all contingencies which have the given time as their next trigger time.
 * @param {Date} The time to find triggers for.
 * @return {Promise} The results of the search.
 */
contingencySchema.statics.findTriggersForTime = function findTriggersForTime(time) {
  console.log('Finding triggers..');
  console.log('Time: ', time);

  return this
    .find({
      standardisedTriggerTime: moment(time)
    })
    .exec();
};


/**
 * Create and export model
 * ------------------------------------------------------------------
 */

const Contingency = mongoose.model('Contingency', contingencySchema);
module.exports = Contingency;
