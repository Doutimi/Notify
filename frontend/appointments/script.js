
async function FetchBillsList(){
    let response =await fetch("./get_list") 
    /**@type {import("../../server").AppointmentsData[]} */
    let appointmentsList=await response.json()
    
    let sortedData=appointmentsList.sort((a,b)=>{
        let dateA=new Date(a.date)
        let dateB=new Date(b.date);
        return (dateA.getTime()-dateB.getTime()) ;
    });

    let appointmentsHTML=sortedData.map((item,index)=>(
        `<div class="list-item">
            <span class="bill-name">${item.name}</span>
            <span class="bill-date">${item.date}</span>
        </div>`
    )).join("")

    let container=document.getElementById("container")
    container.innerHTML=appointmentsHTML
}

FetchBillsList()
