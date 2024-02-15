const asyncHandler = require("express-async-handler");
const bcrypt = require ("bcrypt"); //find the documentation of bcrypt on npm documentation
const User = require("../models/userModel"); //import it to interact with mongo db
const jwt = require("jsonwebtoken");


//@desc Register a user
//@route GET /api/user/register
//@access public
//user register function
const registerUser =  asyncHandler (async (req, res) => {
    //destracture registaration requirements
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        //so the validation is failed
        res.status(400);
        throw new Error("All fields are mandotory!");
    }

    //check wheather we have already existing email address or user in database
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400); //validation error
        throw new Error("User Already registered!");
    }

    //create hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is just number of 
    console.log("Hashed Password: ", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    //once user is created
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
    if (!email || !password){
        res.status(400);
        throw new Error("All field are mandatory!");
    }

const user = await User.findOne({email});
//compare password with hashedpassword
if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
        //user as a payload
        user: {
            username: user.username,
            email: user.email,
            id: user.id,
            
        }// payload which is going to be embarded in accessToken
    }, process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "10m"}
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
const currentUser =  asyncHandler (async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser}