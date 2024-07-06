const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const runCode = require('./compiler'); // Importing the runCode function from compiler.js

const app = express();
const port = 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API endpoint to execute code
app.post('/runcode', (req, res) => {
    const { code, input, language } = req.body;
    console.log(code);
    console.log(input);
    console.log(language);

    // Validate input
    if (!code || !language) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Execute the code
    runCode(code, input, language, (err, output) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ output });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
