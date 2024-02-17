const mongoose = require("mongoose");

// Connect to the MongoDB database
const connectDb = async () => {
    try {
        // Use mongoose.connect to establish a connection to the database
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        
        // Log a message indicating that the database is connected
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        );
    }catch(err){

        // Log any error that occurs during the connection attempt
        console.log(err);

        // If an error occurs, exit the process with code 1
        process.exit(1);
    }
};

module.exports = connectDb;