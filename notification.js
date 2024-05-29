const notifier = require('node-notifier');
// String
// notifier.notify('Message');

// Object
notifier.notify({
  title: 'Your Netflix bill is due tomorrow',
  message: 'Get your 4400 ready to pay up!'
});