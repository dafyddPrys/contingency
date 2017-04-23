const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Contingency = require('./Contingency.js');

const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  tokens: Array,

  // Add in objectId ref array
  contingencies: [{
    type: Schema.Types.ObjectId,
    ref: 'Contingency',
  }],

  profile: {
    name: String,
    location: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};


/**
 * Add a contingency ID to the user's array of IDs
 */
userSchema.methods.addContingency = function addContingency(contingencyId) {
  if (this.contingencies.findIndex(v => v === contingencyId) < 0) {
    this.contingencies.push(contingencyId);
  }
  return this.save();
};

/**
 * Make sure the doc's contingencies are populated. Returns the
 * Entire document.
 */
userSchema.methods.populateContingencies = function getContingencies() {
  if (this.populated('contingencies')) {
    return this.exec();
  }
  return this.populate('contingencies').execPopulate();
};

/**
 * Delete a contingency. Couple this method here because we want to check
 * it belongs to this user before deleting.
 */
userSchema.methods.removeContingency = function removeContingency(id) {
  let ownsContingency = false;
  if (this.populated('contingencies')) {
    ownsContingency = this.contingencies.findIndex(c => c.id.toString() === id) > -1;
  } else {
    ownsContingency = this.contingencies.findIndex(c => c.toString() === id) > -1;
  }
  if (ownsContingency) {
    return Contingency.remove(id).exec();
  }
  return Promise.reject('You dont own that contingency');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
