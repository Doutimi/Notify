
async function FetchBill(){
    let response =await fetch(window.location.href+"/data") 
    /**@type {import("../../../server").BillsData} */
    let billData=await response.json()
    
    let formHTML=`
    <form id="myForm" onsubmit="return false">
        <label for="name">Name of bill</label>
        <input class="form-field" type="text" id="name" name="name" value="${billData.name}" required><br>

        <label for="amount">Amount due</label><br>
        <input class="form-field" type="number" id="amount" name="amount" value="${billData.amount}" required><br>

        <label for="date">Due date</label><br>
        <input class="form-field" type="date" id="date" name="date" value="${billData.date}" required><br>

        <label>Recurrence:</label>
        <span>
            <input type="radio" ${billData.frequency==="Yearly"?"checked":""} id="yearly" name="frequency" value="Yearly">
            <label for="option1"> Yearly</label>

            <input type="radio"  ${billData.frequency==="Monthly"?"checked":""}  id="monthly" name="frequency" value="Monthly">
            <label for="option2"> Monthly</label>

            <input type="radio" ${billData.frequency==="Weekly"?"checked":""} id="weekly" name="frequency" value="Weekly">
            <label for="option2"> Weekly</label>

            <input type="radio" ${billData.frequency==="None"?"checked":""}id="none" name="frequency" value="None">
            <label for="option2"> None</label><br>
        </span>

        <div class="btn_frame container" ">
            <button  onclick="HandleSubmit()">Save</button>
            <button  onclick="HandleDelete()"><img src="../trash icon.svg" alt="delete"></button>
        </div>
  </form>`
    

    let container=document.getElementById("container")
    container.innerHTML=formHTML
}

FetchBill()




async function HandleSubmit(event) {
    console.log("got here")
    // event.preventDefault();
    const data = new FormData(document.getElementsByTagName("form")[0]);
  
    const value = Object.fromEntries(data.entries());
  
    console.log({value})
    let response = await fetch(`${window.location.href}/save`,{
      method:"PATCH",
      body:JSON.stringify(value),
      headers:{
        "Content-Type":"application/json"
      }
    })
  
    await response.json()
  
    window.location.href="/bills";
    return false
  
}


async function HandleDelete(event) {
    console.log("got here");
    //id is already in the page url
    let response = await fetch(`${window.location.href}`,{
      method:"DELETE",
    })
  
    await response.text()
    window.location.href="/bills";
    // return false
  
}