const NewsLetter = require('../models/NewsLetterModal');
const sendEmail = require('../utils/SendEmail');
const NewsLetterTemplate = require('../models/NewsLetterSendtemplet')
exports.JoinNewsLetter = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {
        // Check if the email already exists
        let subscriber = await NewsLetter.findOne({ email });
        if (subscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        // Create a new subscriber
        subscriber = new NewsLetter({ email });
        await subscriber.save();
        const options = {
            email: email,
            subject: 'Welcome to our Newsletter',
            message: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Paras Enterprises Newsletter</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                    <table role="presentation" style="width: 100%; max-width: 600px; margin: auto; border-collapse: collapse;">
                        <tr>
                            <td style="background-color: #007BFF; padding: 20px; text-align: center;">
                                <img src="https://i.ibb.co/pZrqqVk/Picture1.png" alt="Paras Enterprises" style="max-width: 200px; height: auto;">
                                <h1 style="color: #ffffff; margin: 20px 0;">Welcome to Paras Enterprises Newsletter!</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; background-color: #ffffff;">
                                <p style="font-size: 16px; color: #333333;">
                                    Dear Subscriber,
                                </p>
                                <p style="font-size: 16px; color: #333333;">
                                    Thank you for joining our newsletter. We are thrilled to have you with us. Expect to receive the latest updates, exclusive offers, and insightful articles directly in your inbox. We are committed to delivering valuable content that helps you stay informed and ahead in your field.
                                </p>
                                <p style="font-size: 16px; color: #333333;">
                                    If you have any questions or need assistance, feel free to reach out to us. We are here to help!
                                </p>
                                <p style="font-size: 16px; color: #333333;">
                                    Best regards,<br>
                                    The Paras Enterprises Team
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #007BFF; padding: 10px; text-align: center;">
                                <p style="font-size: 14px; color: #ffffff; margin: 0;">
                                    © 2024 Paras Enterprises. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        // Send a welcome email
        await sendEmail(options);

        res.status(201).json({ message: 'Subscription successful', subscriber });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update subscription details
exports.updateSubscription = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        const subscriber = await NewsLetter.findByIdAndUpdate(id, { email }, { new: true });
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.status(200).json({ message: 'Subscription updated', subscriber });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
    const { id } = req.params;
    try {
        const subscriber = await NewsLetter.findByIdAndDelete(id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.status(200).json({ message: 'Subscription deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscribers = await NewsLetter.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Send emails in batches of 10
exports.sendEmailsInBatches = async (req, res) => {
    try {
        const subscribers = await NewsLetter.find();
        const batchSize = 10;
        const { id } = req.body;

        const FetchTemplate = await NewsLetterTemplate.findById(id);
        if (!FetchTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        for (let i = 0; i < subscribers.length; i += batchSize) {
            const batch = subscribers.slice(i, i + batchSize);
            const emailPromises = batch.map(subscriber => {
                const options = {
                    email: subscriber.email,
                    subject: FetchTemplate.subject || 'Default Subject',  // Add a fallback if subject is empty
                    message: FetchTemplate.message || 'Default Message',  // Add a fallback if message is empty
                };
                return sendEmail(options).catch(err => {
                    console.error(`Failed to send email to ${subscriber.email}: ${err.message}`);
                    return null;  // or log the error and continue
                });
            });
            await Promise.all(emailPromises);
        }

        res.status(200).json({ message: 'Emails sent in batches' });
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



exports.getAllTemplates = async (req, res) => {
    try {
        const templates = await NewsLetterTemplate.find();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.CreateTemplate = async (req, res) => {
    const { subject, message } = req.body;

    try {
        // Create a new template
        const newTemplate = new NewsLetterTemplate({
            subject,
            message
        });

        // Save the template to the database
        await newTemplate.save();

        // Respond with success
        res.status(201).json({
            message: 'Template created successfully',
            template: newTemplate
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
// Edit a template
exports.editTemplate = async (req, res) => {
    const { id } = req.params;
    const { subject, message } = req.body;
    try {
        const template = await NewsLetterTemplate.findByIdAndUpdate(
            id,
            { subject, message },
            { new: true, runValidators: true }
        );
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        res.status(200).json({ message: 'Template updated', template });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        const template = await NewsLetterTemplate.findByIdAndDelete(id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        res.status(200).json({ message: 'Template deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};