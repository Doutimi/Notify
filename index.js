const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());
/**@typedef {{name:string,amount:string,date:string,frequency:"Monthly"|"Yearly"|"Weekly"|"None",id:string}} BillsData */

// Serve the HTML form
app.use(express.static(path.join(__dirname, 'frontend')));

// Path to the JSON file
const billsFilePath ='./backend/bills.json';
const appointmentsFilePath ='./backend/appointments.json';

//endpoint to get bills list
app.get("/bills/get_list",(req,res)=>{
    /**@type {BillsData[]} */
    let billsData=ReadFile(billsFilePath,[])
    res.send(billsData)
})

//endpoint to get single bill edit page data
app.get("/bills/edit/:id/data",(req,res)=>{
    let id=req.params.id
    console.log(`data  for billsID:${id} received`);

    /**@type {BillsData[]} */
    let billsData=ReadFile(billsFilePath,[])

    let entryData=billsData.find(item=>item.id===id)
    res.send(entryData||{})
})

//endpoint to save an edited  bill entry
app.patch("/bills/edit/:id/save",(req,res)=>{
    let id=req.params.id
    console.log({message:`Save request for ${id} received`})
    
    /**@type {BillsData} */
    let editedBillData={...req.body,id};

    /**@type {BillsData[]} */
    let allBillsData=ReadFile(billsFilePath,[])

    let entryToEdit=allBillsData.find(item=>item.id===id);
    if(!entryToEdit){
        res.send();
        return;
    }

    Object.keys(editedBillData).forEach(key=>{
        entryToEdit[key]=editedBillData[key]
    })

    fs.writeFileSync(billsFilePath,JSON.stringify(allBillsData))
    res.send({message:"bill entry edited successfully"});
})

//endpoint to get single bill edit page
app.get("/bills/edit/:id",(req,res)=>{
    let html=fs.readFileSync("frontend/bills/edit/index.html");
    res.setHeader("Content-Type","text/html")
    res.send(html);
})

//endpoint to delete a single bill entry
app.delete("/bills/edit/:id",(req,res)=>{
    console.log({message:"delete request"})
    let id=req.params.id;
    /**@type {BillsData[]} */
    let allBillsData=ReadFile(billsFilePath,[]);
    //remove the item with the indicated id
    filteredData=allBillsData.filter(item=>item.id!==id);
    //save the edited bills entries
    fs.writeFileSync(billsFilePath,JSON.stringify(filteredData))
    res.send({message:"bill entry deleted successfully"});
})


//endpoint to get appointments list
app.get("/appointments/get_list",(req,res)=>{
    /**@type {AppointmentsData[]} */
    let appointmentsData=ReadFile(appointmentsFilePath,[])
    res.send(appointmentsData)
})

// Endpoint to handle bill form submission
app.post('/bills/new/save', (req, res) => {
    /**@type {BillsData} */
    const billsEntry = req.body
    console.log({body:req.body})

    let historyData=ReadFile(billsFilePath,[])
    //append the new data receive int he http body
    historyData.push(billsEntry)

    fs.writeFileSync(billsFilePath,JSON.stringify(historyData))
    res.send({message:"bills saved successfully"});
});

// Endpoint to handle appointment form submission
app.post('/appointments/new/save', (req, res) => {
    /**@type {AppointmentsData} */
    const appointmentsEntry = req.body
    console.log({body:req.body})

    let historyData=ReadFile(appointmentsFilePath,[])
    //append the new data receive int he http body
    historyData.push(appointmentsEntry)

    fs.writeFileSync(appointmentsFilePath,JSON.stringify(historyData))
    res.send({message:"Appointment saved successfully"});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/**
 * 
 * @param {string} filepath 
 * @param {any} defaultValue a JSON serialiable object value
 */
function ReadFile(filepath,defaultValue){
    //create the file if it doesnt exist and initialise with an empty array
    if(!fs.existsSync(filepath)) fs.writeFileSync(filepath,JSON.stringify(defaultValue));

    /**@type {typeof defaultValue} */
    let historyData =JSON.parse(fs.readFileSync(filepath));

    //if file is not an array, discard old content,
    if(!Array.isArray(historyData)) historyData=defaultValue;

    return historyData
}
