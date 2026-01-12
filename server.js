// Import the necessary modules
// Express framework to build the server
// Morgan middleware for logging HTTP requests
// Path module to handle file and directory paths
// CORS middleware to enable Cross-Origin Resource Sharing
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

// MongoDB connection
// Router to handle GET and POST requests
const { connectDB } = require('./mongoServer.js');
const accessGetPost = require('./serverGetPost.js');

// Port where the server will listen
// Create an instance of the Express application
const PORT = process.env.PORT || 3000;
const app = express();

// First Middleware to log HTTP requests
// 'short' predefined format string of morgan to log minimal output
app.use(morgan('short'));

// Extra Middleware to allow Cross-Origin Resource Sharing
app.use(cors());

// Second Middleware to server static files
// Serve images from the 'images' directory
let imagePath = path.join(__dirname, './images');
app.use(express.static(imagePath));

(async () => {
    try {
        await connectDB();
        console.log('Database connected successfully');

        // Middleware to parse JSON request bodies
        app.use(accessGetPost);

        // Third Middleware to handle 404 errors
        app.use(function (req, res) {
            res.status(404).send(`${res.statusCode}: File not found at ${PORT}`);
        });

        // Starting the server on the defined port (3000)
        app.listen(PORT, () => {
            console.log(`App started on port: ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
})();