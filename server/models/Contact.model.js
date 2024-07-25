const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    ContactNumber: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    isContact: {
        type: Boolean,
        default: false
    },
    AnyMessageByAdmin: {
        type: String,
    }

}, { timestamps: true })

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact