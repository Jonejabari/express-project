// Importing required modules and controllersss
const express = require("express"); // Express.js for building the router
const { 
    registerUser,
    loginUser, 
    currentUser 
} = require("../controllers/userController"); // User-related controllers

// Middleware for validating authentication tokens
const validationToken = require("../middleware/validateTokenHandler");

// Create an instance of the Express router
const router = express.Router();

// Route for user registration (POST /api/users/register)
router.post("/register", registerUser);

// Route for user login (POST /api/users/login)
router.post("/login", loginUser);

// Route for getting the current user (GET /api/users/current)
// Requires token validation using the validateTokenHandler middleware
router.get("/current", validationToken, currentUser);

// Export the router to be used in other parts of the application
module.exports = router;