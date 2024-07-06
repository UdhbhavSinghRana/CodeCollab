const fs = require('fs');
const { exec } = require('child_process');

// Function to run code and return output
function runCode(code, input, language, callback) {
    // Define a directory for temporary files
    const tempDir = './temp';

    // Create the temporary directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    // Generate a unique filename
    const fileName = `code_${Date.now()}.${getFileType(language)}`;
    const filePath = `${tempDir}/${fileName}`;


    // Write code to the temporary file
    fs.writeFileSync(filePath, code);

    // Define commands based on language
    let command, args;
    switch (language) {
        case 'javascript':
            command = 'node';
            args = [filePath];
            break;
        case 'python':
            command = 'python3';
            args = [filePath];
            break;
        case 'java':
            command = 'javac';
            args = [filePath];
            break;
        case 'c_cpp':
            command = 'g++';
            args = [filePath, '-o', `${tempDir}/code`];
            break;
        case 'rust':
            command = 'rustc';
            args = [filePath];
            break;
        case 'kotlin':
            command = 'kotlinc';
            args = [filePath, '-include-runtime', '-d', `${tempDir}/code.jar`];
            break;
        // Add more cases for other languages as needed
        default:
            return callback(new Error('Unsupported language'));
    }

    // Execute the code with input
    exec(`${command} ${args.join(' ')}`, { input }, (error, stdout, stderr) => {
        // Delete the temporary file after execution
        fs.unlinkSync(filePath);

        if (error) {
            return callback(error);
        }
        if (stderr) {
            return callback(new Error(stderr));
        }

        // Return output to the callback function
        callback(null, stdout.trim());
    });
}

// Function to get file extension based on language
function getFileType(language) {
    switch (language) {
        case 'javascript':
            return 'js';
        case 'python':
            return 'py';
        case 'java':
            return 'java';
        case 'c_cpp':
            return 'cpp';
        case 'rust':
            return 'rs';
        case 'kotlin':
            return 'kt';
        // Add more cases for other languages as needed
        default:
            return '';
    }
}

// // Example usage:
// const code = `
// print("hello")
// `;

// const input = 'Alice\n'; // Example input
// const language = 'python';

// runCode(code, input, language, (err, output) => {
//     if (err) {
//         console.error('Error:', err.message);
//     } else {
//         console.log('Output:', output);
//     }
// });

// Function to format code based on language

module.exports = runCode;