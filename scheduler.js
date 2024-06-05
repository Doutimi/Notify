var cron = require('node-cron');
const notifier = require('node-notifier');


cron.schedule('*/1 * * * *', () => {
  console.log('running every minute to 1 from 5');
  
  notifier.notify({
    title: `Your bill is due tomorrow`,
    message: `Get your money ready to pay up!`
  });
});