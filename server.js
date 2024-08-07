const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/findSummation', (req, res) => {
    const { number } = req.body;
    const result = findSummation(parseInt(number));
    res.send(`Summation result: ${result}`);
});

app.post('/uppercaseFirstandLast', (req, res) => {
    const { word } = req.body;
    const result = uppercaseFirstandLast(word);
    res.send(`Modified string: ${result}`);
});

app.post('/findAverageAndMedian', (req, res) => {
    const { array } = req.body;
    const arr = array.split(',').map(Number);
    const result = findAverageAndMedian(arr);
    res.send(`Average: ${result.average}, Median: ${result.median}`);
});

app.post('/find4Digits', (req, res) => {
    const { str } = req.body;
    const result = find4Digits(str);
    res.send(`First four digits: ${result}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
