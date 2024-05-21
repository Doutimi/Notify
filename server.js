const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Serve the HTML form
app.use(express.static(path.join(__dirname, 'frontend')));

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Path to the JSON file
    const filePath = path.join(__dirname, 'backend', 'bills.json');

    // Save form data to JSON file
    fs.writeFile(filePath, JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json({ message: 'Bill saved successfully' });
    });
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
