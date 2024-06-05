const notifier = require('node-notifier');
// String
// notifier.notify('Message');

// Object
notifier.notify({
  title: `Your ${item.name}is due tomorrow`,
  message: `Get your ${item.amount} ready to pay up!`
});