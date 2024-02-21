const asyncHandler = require("express-async-handler");

//find the documentation of bcrypt on npm documentation
const bcrypt = require ("bcrypt"); 
//import it to interact with mongo db
const User = require("../models/userModel"); 
const jwt = require("jsonwebtoken");


//@desc Register a user
//@route GET /api/user/register
//@access public
//user register function
const registerUser =  asyncHandler (async (req, res) => {
    //destracture registaration requirements
    const {username, email, password} = req.body;

    // Validate required fields
    if(!username || !email || !password){
        //so the validation is failed
        res.status(400);
        throw new Error("All fields are mandotory!");
    }

    // Check if the email is already registered
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400); 
        //validation error
        throw new Error("User Already registered!");
    }

    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is just number
   
    console.log("Hashed Password: ", hashedPassword);

     // Create a new user in the database
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Respond with user details
    console.log(`User create ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("user data not valid");
    }
    
    res.json({ message: "Register the user"});
});

//@desc Login user
//@route GET /api/user/login
//@access public
//login user function
const loginUser =  asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    // Validate required fields
    if (!email || !password){
        res.status(400);
        throw new Error("All field are mandatory!");
    }
// Find user by email
const user = await User.findOne({email});

//compare password with hashedpassword
if(user && (await bcrypt.compare(password, user.password))){
    // Create and send an access token upon successful login
    const accessToken = jwt.sign({
        //user as a payload
        user: {
            username: user.username,
            email: user.email,
            id: user.id,
            
        }// payload which is going to be embarded in accessToken
    }, process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "20m"}
    ); 
    res.status(200).json({ accessToken });
}else{
    res.status(401);
    throw new Error("email or password is not valid")     
}
    //res.json({ message: "Login user"}); 
});

//@desc current info user
//@route GET /api/user/current
//@access private
// Get current user information
const currentUser =  asyncHandler (async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser}