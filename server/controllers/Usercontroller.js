const User = require('../models/UserModel');
const SendToken = require('../utils/SendToken');
const SendEmail = require('../utils/SendEmail');

exports.register = async (req, res) => {
    try {
        const { FullName, Email, ContactNumber, Password } = req.body;

        // Check if all required fields are provided
        if (!FullName || !Email || !ContactNumber || !Password) {
            return res.status(403).json({
                success: false,
                msg: 'Please Fill All Required Fields'
            });
        }

        // Check if email or contact number already exists
        const existingUserEmail = await User.findOne({ Email });
        if (existingUserEmail) {
            return res.status(403).json({
                success: false,
                msg: 'User Already Exists With This Email'
            });
        }

        const existingUserContact = await User.findOne({ ContactNumber });
        if (existingUserContact) {
            return res.status(403).json({
                success: false,
                msg: 'User Already Exists With This Contact Number'
            });
        }

        // Check password length
        if (Password.length <= 6) {
            return res.status(403).json({
                success: false,
                msg: 'Password Length Must be Greater than 6 Digits'
            });
        }

        // Define initial user data
        const userData = {
            FullName,
            Password,
            Email,
            ContactNumber,
        };

        // Create new user instance
        const newUser = new User(userData);

        // Save user to database
        await newUser.save();

        // Prepare email options
        const emailOptions = {
            email: Email,
            subject: 'Welcome to Paras Enterprises!',
            message: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            background-color: #f5f5f5;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .header {
                            background-color: #007bff;
                            color: #fff;
                            padding: 10px;
                            text-align: center;
                            border-top-left-radius: 8px;
                            border-top-right-radius: 8px;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content p {
                            margin-bottom: 10px;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Welcome to Paras Enterprises!</h1>
                        </div>
                        <div class="content">
                            <p>Dear ${FullName},</p>
                            <p>Thank you for registering with Paras Enterprises. We are delighted to have you as a part of our community.</p>
                            <p>If you have any questions or need assistance, please feel free to contact us.</p>
                        </div>
                        <div class="footer">
                            <p>Best regards,</p>
                            <p>Paras Enterprises Team</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };


        // Send welcome email
        await SendEmail(emailOptions);

        // Send token to the user
        await SendToken(newUser, res, 201);


    } catch (error) {
        console.error('Error creating user:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `${duplicateField} already exists`
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join('. ')
            });
        }

        // Handle other errors
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.login = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        // Validate password
        const isMatch = await user.comparePassword(Password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: 'Invalid credentials'
            });
        }

        await SendToken(user, res, 201)
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};

exports.logout = async (req, res) => {
    try {
        // Clearing cookies directly
        res.clearCookie('token'); // Replace 'token' with your cookie name
        res.status(200).json({
            success: true,
            msg: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};

exports.passwordChangeRequest = async (req, res) => {

    try {
        const { Email, NewPassword } = req.body;
        // Generate OTP and expiry time
        const OTP = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        const OTPExpires = new Date();
        OTPExpires.setMinutes(OTPExpires.getMinutes() + 10); // Set expiry time to 10 minutes from now
        // Check password length
        if (NewPassword.length <= 6) {
            return res.status(403).json({
                success: false,
                msg: 'Password Length Must be Greater than 6 Digits'
            });
        }

        // Update user document with OTP and expiry
        const user = await User.findOneAndUpdate(
            { Email },
            {
                $set: {
                    PasswordChangeOtp: OTP,
                    OtpExpiredTime: OTPExpires,
                    NewPassword: NewPassword
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        // Prepare email options
        const emailOptions = {
            email: Email,
            subject: 'Password Reset OTP',
            message: `
                <html>
                <head>
                
                </head>
                <body>
                    <p>Your OTP for password reset is: <strong>${OTP}</strong></p>
                    <p>Please use this OTP within 10 minutes to reset your password.</p>
                </body>
                </html>
            `
        };

        // Send OTP via email
        await SendEmail(emailOptions);

        res.status(200).json({
            success: true,
            msg: 'OTP sent successfully. Check your email.'
        });
    } catch (error) {
        console.error('Password change request error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};

exports.verifyOtpAndChangePassword = async (req, res) => {
    const { Email, OTP } = req.body;

    try {
        // Check if OTP is valid and not expired
        const user = await User.findOne({
            Email,
            PasswordChangeOtp: OTP,
            OtpExpiredTime: { $gt: Date.now() } // Check if OTP is not expired
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid OTP or OTP expired'
            });
        }
        console.log(user)
        // Update password
        user.Password = user.NewPassword; // Assign NewPassword from user object to Password field
        user.PasswordChangeOtp = undefined;
        user.OtpExpiredTime = undefined;
        user.NewPassword = undefined; // Clear NewPassword field after using it
        await user.save();

        // Send password change success email
        const successEmailOptions = {
            email: Email,
            subject: 'Password Changed Successfully',
            message: `
                <html>
                <head>
                   
                </head>
                <body>
                    <p>Your password has been successfully changed.</p>
                    <p>If you did not perform this action, please contact us immediately.</p>
                </body>
                </html>
            `
        };

        // Send email notification
        await SendEmail(successEmailOptions);

        res.status(200).json({
            success: true,
            msg: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Verify OTP and change password error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};
exports.resendOtp = async (req, res) => {
    const { Email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        // Check if OTP is expired or not
        if (user.OtpExpiredTime > Date.now()) {
            return res.status(400).json({
                success: false,
                msg: 'OTP is not yet expired. Please wait before requesting a new one.'
            });
        }

        // Generate new OTP and update expiry time
        const OTP = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        const OTPExpires = new Date();
        OTPExpires.setMinutes(OTPExpires.getMinutes() + 10); // Set expiry time to 10 minutes from now

        // Update user document with new OTP and expiry
        user.PasswordChangeOtp = OTP;
        user.OtpExpiredTime = OTPExpires;
        await user.save();

        // Prepare email options
        const emailOptions = {
            email: Email,
            subject: 'Password Reset OTP',
            message: `
                <html>
                <head>
                
                </head>
                <body>
                    <p>Your new OTP for password reset is: <strong>${OTP}</strong></p>
                    <p>Please use this OTP within 10 minutes to reset your password.</p>
                </body>
                </html>
            `
        };

        // Send OTP via email
        await SendEmail(emailOptions);

        res.status(200).json({
            success: true,
            msg: 'New OTP sent successfully. Check your email.'
        });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};

exports.addDeliveryDetails = async (req, res) => {
    try {
        const user = req.user; // Assuming req.user contains the authenticated user
        console.log(user)
        // Find the user by ID
        const userExist = await User.findById(user.id._id);
        if (!userExist) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        // Extract DeliveryAddress from req.body
        const { DeliveryAddress } = req.body;

        // Update user's DeliveryAddress
        userExist.DeliveryAddress = DeliveryAddress;

        // Save updated user
        await userExist.save();

        res.status(200).json({
            success: true,
            msg: 'Delivery details added/updated successfully',
            user: userExist
        });
    } catch (error) {
        console.error('Error adding delivery details:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};
exports.updateDeliveryAddress = async (req, res) => {
    try {
        const userId = req.user.id._id; // Assuming req.user contains the authenticated user's ID

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }

        // Extract DeliveryAddress fields from req.body that are actually updated
        const { City, PinCode, HouseNo, Street, NearByLandMark } = req.body;

        // Update user's DeliveryAddress fields only if they are provided in req.body
        if (City) user.DeliveryAddress.City = City;
        if (PinCode) user.DeliveryAddress.PinCode = PinCode;
        if (HouseNo) user.DeliveryAddress.HouseNo = HouseNo;
        if (Street) user.DeliveryAddress.Street = Street;
        if (NearByLandMark) user.DeliveryAddress.NearByLandMark = NearByLandMark;

        // Save updated user
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Delivery address updated successfully',
            user: user // Optionally, you can return the updated user object
        });
    } catch (error) {
        console.error('Error updating delivery address:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};