const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());
/**@typedef {{name:string,amount:string,date:string,frequency:string,id:string}} BillsData */

// Serve the HTML form
app.use(express.static(path.join(__dirname, 'frontend')));

// Path to the JSON file
const billsFilePath ='./backend/bills.json';

//endpoint to get bills list
app.get("/bills/get_list",(req,res)=>{
    /**@type {BillsData[]} */
    let billsData=ReadFile(billsFilePath,[])
    res.send(billsData)
})

// Endpoint to handle form submission
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

// Endpoint to serve JSON data
app.get('/backend', (req, res) => {
    const filePath = path.join(__dirname, 'backend', 'bills.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(JSON.parse(data));
    });
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
