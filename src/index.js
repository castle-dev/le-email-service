var q = require('q');
/**
 * A tool for sending emails
 * @class EmailService
 * @param {EmailProvider} provider the email provider which this service delegates to
 * @param {StorageService} storage an instance of le-storage-service that is used to create records
 * @param {string} from the email address of the sender
 * @returns {service}
 */
var EmailService = function (provider, storage, from) {
  if (!provider) { throw new Error('Email provider required'); }
  if (!storage) { throw new Error('Storage service required'); }
  if (!from) { throw new Error('From email address required'); }
  var _provider = provider;
  var _storage = storage;
  var _from = from;
  /**
   * Sends an email with html content
   * @function sendHtml
   * @memberof EmailService
   * @instance
   * @param {string} to the email address of the recipient
   * @param {string} subject the subject line of the email
   * @param {string} html the html content
   * @returns {promise} resolves with the newly created email record
   */
  this.sendHtml = function (to, subject, html) {
    if (!to) { return q.reject(new Error('To email required')); }
    if (!subject) { return q.reject(new Error('Subject required')); }
    if (!html) { return q.reject(new Error('HTML required')); }
    return _provider.sendHtml(_from, to, subject, html)
    .then(function () {
      var record = _storage.createRecord('Email');
      return record.update({
        from: _from,
        to: to,
        subject: subject,
        html: html
      }).then(function () { return record });
    });
  };
  /**
   * Sends a template email
   * @function sendTemplate
   * @memberof EmailService
   * @instance
   * @param {string} to the email address of the recipient
   * @param {string} id the unique identifier of the template
   * @param {Object} data the key/value pairs to inject
   * @returns {promise} resolves with the newly created email record
   */
  this.sendTemplate = function (to, id, data) {
    if (!to) { return q.reject(new Error('To email required')); }
    if (!id) { return q.reject(new Error('Template ID required')); }
    return _provider.sendTemplate(_from, to, id, data)
    .then(function () {
      var record = _storage.createRecord('Email');
      return record.update({
        from: _from,
        to: to,
        template: id
      }).then(function () { return record });
    });
  };
}

module.exports = EmailService;
