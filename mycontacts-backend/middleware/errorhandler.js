// Importing required constants
const { constants } = require("../constants");

// Error handling middleware function
const errorHandler = (err, req, res, next) => {
    // Get the HTTP status code from the response or default to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;
    
     // Switch statement to handle different error scenarios
    switch (statusCode) {

        // Handle validation errors
        case constants.VALIDATION_ERROR:            
            res.json
            ({tittle: "Validation Failed",
            message: err.message, 
            stackTrace: err.stack
         });
            break;

        // Handle not found errors
        case constants.NOT_FOUND:
        res.json
        ({tittle: "Not Found",
         message: err.message, 
         stackTrace: err.stack
        });

        // Handle unauthorized errors
        case constants.UNAUTHORIZED:
        res.json
        ({tittle: "Unauthorized",
         message: err.message, 
         stackTrace: err.stack
        });

        // Handle forbidden errors
        case constants.FORBIDDEN:
        res.json
        ({tittle: "Forbidden",
         message: err.message, 
         stackTrace: err.stack
        });

        // Handle generic server errors
        case constants.SERVER_ERROR:
        res.json
        ({tittle: "Server error",
         message: err.message, 
         stackTrace: err.stack
        });

        // Default case for no error (log to console)
        default:
            console.log("No error, All good");
            break;
    }
    
    
};
// Export the error handling middleware for use in other parts of the application
module.exports = errorHandler;