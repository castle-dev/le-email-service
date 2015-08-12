var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

var StorageProvider = require('le-storage-provider-firebase');
var StorageService = require('le-storage-service');
var firebaseUrl = process.env.FIREBASE_URL;
var storage = new StorageService(new StorageProvider(firebaseUrl));
var EmailProvider = require('le-email-provider-mandrill');
var EmailService = require('../../src/index.js');
var mandrillAPIKey = process.env.MANDRILL_API_KEY;
var email = new EmailService(new EmailProvider(mandrillAPIKey), storage, 'robot@domain.com');

describe('e2e tests::', function () {
  this.timeout(10000);
  var service;
  it('should respect logic', function () {
    expect(true).to.be.true;
    expect(true).not.to.be.false;
  });
  it('should send an html email', function () {
    var promise = email.sendHtml('email@domain.com', 'Subject', '<h1>Hello!</h1>');
    return expect(promise).to.eventually.be.fulfilled;
  });
  it('should send html emails only to valid recipients', function () {
    var promise = email.sendHtml('bob', 'Subject', '<h1>Hello!</h1>');
    return expect(promise).to.eventually.be.rejected;
  });
  it('should send templates', function () {
    var promise = email.sendTemplate('email@domain.com', 'welcome');
    return expect(promise).to.eventually.be.fulfilled;
  });
  it('should send templates with dynamic content', function () {
    var promise = email.sendTemplate('bob@domain.com', 'welcome', {name: 'Bob'});
    return expect(promise).to.eventually.be.fulfilled;
  });
  it('should not send invalid templates', function () {
    var promise = email.sendTemplate('email@domain.com', 'invalid-template-id');
    return expect(promise).to.eventually.be.rejected;
  });
  it('should not send emails with reply-to specified', function () {
    var promise = email.sendTemplate('bob@domain.com', 'welcome', {name: 'Bob'}, 'support@domain.com');
    return expect(promise).to.eventually.be.fulfilled;
  });
});
