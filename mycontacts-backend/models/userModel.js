const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please add the user name"],
    },
    email: {
        type: String,
        require: [true, "Please add the user name"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        require: [true, "Please add the password"],
        
    },
}, 
{
    timestamps: true,
});

module.exports = mongoose.model("User", userschema);