const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5001;

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;

    // Regular expression to validate phone number format ddd-ddd-dddd
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (phoneRegex.test(phone)) {
        res.send(`Hello, ${name}. The phone number ${phone} is valid.`);
    } else {
        res.send(`Hello, ${name}. The phone number ${phone} is invalid. Please enter in the format ddd-ddd-dddd.`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
