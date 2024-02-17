const mongoose = require("mongoose");

// Define the user schema
const userschema = mongoose.Schema({
    // User's username
    username: {
        type: String,
        require: [true, "Please add the user name"],
    },
    // User's email address
    email: {
        type: String,
        require: [true, "Please add the user name"],
        unique: [true, "Email address already taken"],
    },
    // User's password
    password: {
        type: String,
        require: [true, "Please add the password"],
        
    },
}, 
{
     // Enable timestamps to automatically add createdAt and updatedAt fields
    timestamps: true,
});

// Create a User model using the defined schema
module.exports = mongoose.model("User", userschema);