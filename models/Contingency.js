
const mongoose = require('mongoose');


const contingencyTypeEnum = {
  email: 'email',
  webhook: 'webhook'
};

const activeStatusEnum = {
  active: 'active',
  paused: 'paused'
};

const contingencySchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'paused',
  }
});


/**
 * Schema methods
 * ------------------------------------------------------------------
 */

// contingencySchema.methods.activate = function activate() {

// }


/**
 * Create and export model
 * ------------------------------------------------------------------
 */

const Contingency = mongoose.model('Contingency', contingencySchema);
module.exports = Contingency;
