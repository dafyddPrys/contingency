
const contingencyTypeEnum = {
  email,
  webhoook
};


const contingencySchema = new mongoose.Schema({

})


contingencySchema.methods.activate = function activate() {

}
/**
 * Create and export the model.
 */
const Contingency = mongoose.model('Contingency', contingencySchema);
module.exports = Contingency;