const Contact = require('../models/Contact.model');

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const { Email, Name, ContactNumber, Message } = req.body;

        const newContact = new Contact({
            Email,
            Name,
            ContactNumber,
            Message
        });

        await newContact.save();
        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get all contacts
exports.GetContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Delete a contact by ID
exports.DeleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }

        res.status(200).json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Push an admin message to a contact
exports.PushAdminMessageContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { AnyMessageByAdmin } = req.body;
        console.log(AnyMessageByAdmin);

        const contact = await Contact.findByIdAndUpdate(
            id,
            { 
                AnyMessageByAdmin,
                isContact: true 
            },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }

        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

