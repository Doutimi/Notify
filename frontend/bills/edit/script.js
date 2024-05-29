
async function FetchBill(){
    let response =await fetch("./id/data") 
    /**@type {import("../../server").BillData[]} */
    let billsList=await response.json()
    

    let billHTML=BillsData.map((item,index)=>(
        `<form id="myForm">
        <label for="name">Name of bill</label>
        <input class="form-field" type="text" id="name" name="name" value="Spotify" required><br>
        <label for="amount">Amount due</label><br>
        <input class="form-field" type="number" id="amount" name="amount" placeholder="1400" required><br>
        <label for="date">Due date</label><br>
        <input class="form-field" type="date" id="date" name="date" required><br>
        <label>Recurrence:</label>
        <span>
            <input type="radio" id="yearly" name="frequency" value="Yearly">
            <label for="option1"> Yearly</label>
            <input type="radio" id="monthly" name="frequency" value="Monthly">
            <label for="option2"> Monthly</label>
            <input type="radio" id="weekly" name="frequency" value="Weekly">
            <label for="option2"> Weekly</label>
            <input type="radio" id="none" name="frequency" value="None">
            <label for="option2"> None</label><br>
        </span>
      </form>`
    )).join("")

    let container=document.getElementById("container")
    container.innerHTML=billHTML
}

FetchBillsList()
