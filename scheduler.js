var cron = require('node-cron');

cron.schedule('*/1 * * * *', () => {
  console.log('running every minute to 1 from 5');
});