// Importing required modules and packages

const express = require("express"); // Express.js for building the web server
const errorHandler = require("./middleware/errorhandler"); // Custom error handling middleware
const connectDb = require("./config/dbConnection"); // Database connection function
const dotenv = require("dotenv").config(); // Load environment variables from .env file

// Establish a connection to the database
connectDb(); 

// Create an instance of the Express application
const app = express(); 

// Define the port number for the server, using process.env.PORT or defaulting to 5000
const port = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes for handling /*contacts*/ and users, and associate them with specific URL paths
app.use('/api/contacts', require("./routes/contactsRoutes"));
app.use('/api/users', require("./routes/userRoutes"));

// Apply the custom error handling middleware to handle errors in the application
app.use(errorHandler)

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server running on port ${port}');
});