le-email-service
=========

**Send emails**

## Installation

  `npm install le-email-service`

## Usage

```
  var storage = /* initialize storage service */
  var provider = /* initialize email provider */
  var EmailService = require('le-email-service');
  var email = new EmailService(provider, storage, 'from@email.com');

  email.sendHtml('to@email.com', 'Subject', '<h1>Hello!</h1>')
  .then(function (record) {
    ...
  });
```

## Tests

* `npm test` to run unit tests once
* `gulp tdd` to run unit and e2e tests when tests change
* `gulp coverage` to run unit tests and create a code coverage report

## Contributing

Please follow the project's [conventions](https://github.com/castle-dev/le-email-service/blob/develop/CONTRIBUTING.md) or your changes will not be accepted

## Release History

* 0.1.0 Initial release
