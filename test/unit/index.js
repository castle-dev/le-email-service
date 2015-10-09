var q = require('q');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var sinonAsPromised = require('sinon-as-promised')
var expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

var EmailService = require('../../src/index.js');

describe('unit tests::', function () {
  var service;
  var provider = {
    sendHtml: sinon.stub().resolves(),
    sendTemplate: sinon.stub().resolves()
  };
  var mockStorageService = {
    createRecord: sinon.stub().returns({
      update: sinon.stub().resolves()
    })
  };
  var fromEmail = 'robot@domain.com';
  it('should respect logic', function () {
    expect(true).to.be.true;
    expect(true).not.to.be.false;
  });
  it('should be constructable', function () {
    expect(function () { service = new EmailService(provider, mockStorageService, fromEmail); }).not.to.throw();
  });
  it('should require a provider', function () {
    expect(function () { new EmailService(); }).to.throw('Email provider required');
  });
  it('should require a storage service', function () {
    expect(function () { new EmailService(provider); }).to.throw('Storage service required');
  });
  it('should require a from email', function () {
    expect(function () { new EmailService(provider, mockStorageService); }).to.throw('From email address required');
  });
  it('should send html emails', function () {
    var promise = service.sendHtml('recipient@email.com', 'Subject', '<h1>Hello!</h1>');
    expect(provider.sendHtml).to.have.been.called;
    return expect(promise).to.eventually.be.fulfilled;
  });
  it('should require to email to send html emails', function () {
    return expect(service.sendHtml()).to.eventually.be.rejectedWith('To email required');
  });
  it('should require subject to send html emails', function () {
    return expect(service.sendHtml('recipeint@email.com')).to.eventually.be.rejectedWith('Subject required');
  });
  it('should require html to send html emails', function () {
    return expect(service.sendHtml('recipeint@email.com', 'Subject')).to.eventually.be.rejectedWith('HTML required');
  });
  it('should send template emails', function () {
    var promise = service.sendTemplate('recipient@email.com', 'welcome');
    expect(provider.sendTemplate).to.have.been.called;
    return expect(promise).to.eventually.be.fulfilled;
  });
  it('should send template emails with subjects', function () {
    var to = 'recipient@email.com';
    var id = 'welcome';
    var data = {};
    var replyTo;
    var subject = 'Hello';
    var promise = service.sendTemplate(to, id, data, replyTo, subject);
    expect(provider.sendTemplate).to.have.been.calledWith(fromEmail, to, id, data, replyTo, subject);
    return expect(promise).to.eventually.be.fulfilled;
  });
});
