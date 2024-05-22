
async function FetchBillsList(){
    let response =await fetch("./get_list") 
    /**@type {import("../../server").BillsData[]} */
    let billsList=await response.json()
    
    let billsHTML=billsList.map((item,index)=>(
        `<div class="list-item">
            <span class="bill-name">${item.name}</span>
            <span class="bill-date">${item.date}</span>
        </div>`
    ))

    let container=document.getElementById("container")
    container.innerHTML=billsHTML
}

FetchBillsList()
