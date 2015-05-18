var q = require('q');

var EmailService = function (emailProvider, storageService, fromEmail) {
  if (!emailProvider) { throw new Error('Email provider required'); }
  if (!storageService) { throw new Error('Storage service required'); }
  if (!fromEmail) { throw new Error('From email address required'); }
  var _provider = emailProvider;
  var _storage = storageService;
  var _from = fromEmail;

  this.sendHtml = function (to, subject, html) {
    if (!to) { return q.reject(new Error('To email required')); }
    if (!subject) { return q.reject(new Error('Subject required')); }
    if (!html) { return q.reject(new Error('HTML required')); }
    return _provider.sendHtml(_from, to, subject, html)
    .then(function () {
      var record = _storage.createRecord('Email');
      return record.update({
        to: to,
        subject: subject,
        html: html
      }).then(function () { return record });
    });
  };

  this.sendTemplate = function (to, id, data) {
    if (!to) { return q.reject(new Error('To email required')); }
    if (!id) { return q.reject(new Error('Template ID required')); }
    return _provider.sendTemplate(_from, to, id, data)
    .then(function () {
      var record = _storage.createRecord('Email');
      return record.update({
        to: to,
        template: id
      }).then(function () { return record });
    });
  };
}

module.exports = EmailService;
