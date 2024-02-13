const asyncHandler = require("express-async-handler");
const bcrypt = require ("bcrypt");
const User = require("../models/userModels");

//@desc Register a user
//@route GET /api/user/register
//@access public
const registerUser =  asyncHandler (async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandotory!");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already registered!");
    }

    //create hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);


    res.json({ message: "Register the user"});
});

//@desc Login user
//@route GET /api/user/login
//@access public
const loginUser =  asyncHandler (async (req, res) => {
    res.json({ message: "Login user"}); 
});

//@desc current info user
//@route GET /api/user/current
//@access private
const currentUser =  asyncHandler (async (req, res) => {
    res.json({ message: "current user information"});
});

module.exports = {registerUser, loginUser, currentUser}