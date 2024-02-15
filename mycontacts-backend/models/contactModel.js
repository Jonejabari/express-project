const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add phone number"],
    },
    /*full_name: {
        type: String,
        required: [true, "Please add full name"],
    },
    address: {
        type: String,
        required: [true, "Please add address"],
    },
    education: {
        type: String,
        required: [true, "Please add education"],
    },*/

}, 
{
    timestamps: true,
}
);

module.exports = mongoose.model("Contact", contactSchema);