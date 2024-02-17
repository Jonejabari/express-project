// Importing required modules
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware for validating JWT
const validationToken = asyncHandler(async (req, res, next) => {
    // Initialize variables to store the token and the authorization header
    let token;
    let authHeader = req.headers.authorization;

    // Check if the authorization header is present and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")){

        // Extract the token from the authorization header
        token = authHeader.split(" ")[1];

         // Verify the token using the secret key
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err){

                // If token verification fails, set HTTP status to 401 (Unauthorized)
                res.status(401);
                throw new Error("user is not authorized");
            }
            // If verification is successful, extract user information from the decoded token
            req.user = decoded.user;
            next();
        });

        // If no valid token is present in the authorization header, set HTTP status to 401
        if(!token){
            req.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
});
// Export the validationToken middleware for use in other parts of the application
module.exports = validationToken;