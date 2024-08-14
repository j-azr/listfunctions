const express = require('express');
const app = express();
const port = process.env.PORT ||3000;

app.use(express.urlencoded({ extended: true }));

// Function: findSummation
function findSummation(number = 1) {
    if (typeof number !== 'number' || number <= 0 || !Number.isInteger(number)) {
        return false;
    }

    let sum = 0;
    for (let i = 1; i <= number; i++) {
        sum += i;
    }
    return sum;
}

// Function: uppercaseFirstandLast
function uppercaseFirstandLast(inputString) {
    if (typeof inputString !== 'string' || inputString.trim() === '') {
        return false;
    }

    return inputString.split(' ').map(word => {
        if (word.length === 1) {
            return word.toUpperCase();
        }

        return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
    }).join(' ');
}

// Function: findAverageAndMedian
function findAverageAndMedian(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0 || numbers.some(num => typeof num !== 'number')) {
        return false;
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    numbers.sort((a, b) => a - b);
    let median;
    const mid = Math.floor(numbers.length / 2);
    if (numbers.length % 2 === 0) {
        median = (numbers[mid - 1] + numbers[mid]) / 2;
    } else {
        median = numbers[mid];
    }

    return { average, median };
}

// Function: find4Digits
function find4Digits(inputString) {
    if (typeof inputString !== 'string' || inputString.trim() === '') {
        return false;
    }

    const words = inputString.split(' ');
    for (const word of words) {
        if (word.length === 4 && /^\d{4}$/.test(word)) {
            return word;
        }
    }

    return false;
}

// Root route to display a list of available endpoints
app.get('/', (req, res) => {
    res.send(`
        <h1>Available Endpoints</h1>
        <ul>
            <li><a href="/findSummation">findSummation</a></li>
            <li><a href="/uppercaseFirstandLast">uppercaseFirstandLast</a></li>
            <li><a href="/findAverageAndMedian">findAverageAndMedian</a></li>
            <li><a href="/find4Digits">find4Digits</a></li>
        </ul>
    `);
});

// Route to display the form for findSummation
app.get('/findSummation', (req, res) => {
    res.send(`
        <form action="/findSummation" method="post">
            <label for="number">Enter a positive integer:</label>
            <input type="text" id="number" name="number">
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route to handle form submission for findSummation
app.post('/findSummation', (req, res) => {
    const inputNumber = parseInt(req.body.number, 10);
    const result = findSummation(inputNumber);

    res.send(`Result: ${result}`);
});

// Route to display the form for uppercaseFirstandLast
app.get('/uppercaseFirstandLast', (req, res) => {
    res.send(`
        <form action="/uppercaseFirstandLast" method="post">
            <label for="inputString">Enter a string:</label>
            <input type="text" id="inputString" name="inputString">
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route to handle form submission for uppercaseFirstandLast
app.post('/uppercaseFirstandLast', (req, res) => {
    const inputString = req.body.inputString;
    const result = uppercaseFirstandLast(inputString);

    res.send(`Result: ${result}`);
});

// Route to display the form for findAverageAndMedian
app.get('/findAverageAndMedian', (req, res) => {
    res.send(`
        <form action="/findAverageAndMedian" method="post">
            <label for="numbers">Enter an array of numbers (comma-separated):</label>
            <input type="text" id="numbers" name="numbers">
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route to handle form submission for findAverageAndMedian
app.post('/findAverageAndMedian', (req, res) => {
    const numbers = req.body.numbers.split(',').map(Number);
    const result = findAverageAndMedian(numbers);

    res.send(`Result: ${JSON.stringify(result)}`);
});

// Route to display the form for find4Digits
app.get('/find4Digits', (req, res) => {
    res.send(`
        <form action="/find4Digits" method="post">
            <label for="inputString">Enter a string of numbers separated by spaces:</label>
            <input type="text" id="inputString" name="inputString">
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route to handle form submission for find4Digits
app.post('/find4Digits', (req, res) => {
    const inputString = req.body.inputString;
    const result = find4Digits(inputString);

    res.send(`Result: ${result}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
