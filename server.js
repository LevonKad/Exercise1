const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Functions
function findSummation(n) {
    var result = 0;
    if (n > 0) {
        for (var i = 1; i <= n; i++) {
            result = result + i;
        }
    } else if (n == 0) {
        result = 1;
    } else {
        result = false;
    }
    return result;
}

function uppercaseFirstandLast(word) {
    if (typeof word !== 'string' || word.trim().length === 0) {
        return false;
    }

    var wordLength = word.length;
    var firstUpper = word[0].toUpperCase() + word.substring(1, wordLength);
    var lastUpper = firstUpper.substring(0, wordLength - 1) + firstUpper[wordLength - 1].toUpperCase();

    return lastUpper;
}

function findAverageAndMedian(arr) {
    var median = 0;
    var average = 0;

    for (var i = 0; i < arr.length; i++) {
        average = average + arr[i];
    }
    average = (average / arr.length).toFixed(2);

    if (arr.length % 2 != 0) {
        median = arr[Math.floor(arr.length / 2)];
    } else {
        var firstMedian = arr[Math.floor(arr.length / 2) - 1];
        var secondMedian = arr[Math.ceil(arr.length / 2)];
        median = (firstMedian + secondMedian) / 2;
    }
    median = median.toFixed(2);
    return { average, median};
}

function find4Digits(str) {
    if (typeof str !== 'string' || str.trim().length === 0) {
        return false;
    }

    var splitArray = str.split(" ");
    var joinedString = splitArray.join("");

    if (joinedString.length < 4) {
        return false;
    }
    var fourDigit = joinedString.substring(0, 4);
    return fourDigit;
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/findSummation', (req, res) => {
    try {
        const { number } = req.body;
        if (isNaN(number)) {
            throw new Error("Input is not a number");
        }
        const result = findSummation(parseInt(number));
        if (result === false) {
            res.status(400).send("Invalid input: negative numbers are not allowed");
        } else {
            res.send(`Summation result: ${result}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/uppercaseFirstandLast', (req, res) => {
    try {
        const { word } = req.body;
        const result = uppercaseFirstandLast(word);
        if (result === false) {
            res.status(400).send("Invalid input: Please provide a valid string");
        } else {
            res.send(`Modified string: ${result}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/findAverageAndMedian', (req, res) => {
    try {
        const { array } = req.body;
        if (!array || !Array.isArray(array.split(',').map(Number))) {
            throw new Error("Input is not an array of numbers");
        }
        const arr = array.split(',').map(Number);
        const result = findAverageAndMedian(arr);
        res.send(`Average: ${result.average}, Median: ${result.median}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/find4Digits', (req, res) => {
    try {
        const { str } = req.body;
        const result = find4Digits(str);
        if (result === false) {
            res.status(400).send("Invalid input: Please provide a valid string of numbers");
        } else {
            res.send(`First four digits: ${result}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
