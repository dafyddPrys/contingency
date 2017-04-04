$('document').ready(function() {
  $('#webhook-form').validate();
});


/**
 * Try and pretty print JSON in the textarea.
 * Show a warning underneath if input cannot be parsed.
 * called onblur on textarea
 */
function prettyPrint() {
  const warningElement = document.getElementById('prettyprint-warning');
  const ugly = document.getElementById('payload').value;
  let obj;

  if (ugly) {
    try {
      obj = JSON.parse(ugly);
      warningElement.innerHTML = '';
    } catch (e) {
      console.warn('invalid json in webhook body: ', e);
      warningElement.innerHTML = `Your JSON is invalid! Hint: ${e.message}`;
    }
  }

  if (obj) {
    const pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('payload').value = pretty;
  }
}
