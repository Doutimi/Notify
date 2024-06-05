const notifier = require('node-notifier');
var cron = require('node-cron');


async function CheckDate(){
    let response =await fetch("http://localhost:3000/bills/get_list") 
    /**@type {import("./server").BillsData[]} */
    let billsList=await response.json()

    let today = new Date();

    //looping through the list entries
    for (let item of billsList){
        let itemDate = new Date(item.date);

        if (itemDate.toLocaleDateString() === today.toLocaleDateString()){ 
            console.log(`date comparison successful`)
            notifier.notify({
                title: `Your ${item.name} is due ${item.date}`,
                message: `Get your ${item.amount} ready to pay up!`
              });
              
        }
    }
} 
cron.schedule('*/1 * * * *', () => {
    console.log('running every minute');
    CheckDate()
});
// CheckDate()
