const notifier = require('node-notifier');
// String
// notifier.notify('Message');

// Object
notifier.notify({
  title: `Your bill is due tomorrow`,
  message: `Get your money ready to pay up!`
});