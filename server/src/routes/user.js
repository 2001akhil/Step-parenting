const express = require('express');
const UserModel = require('../connection/schema/user-schema');
const MailService = require('../nodemailer/nodemail');

class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    /**
     * Initialize API routes.
     * This method defines all the routes available for this controller.
     */
    initializeRoutes() {
        this.router.post('/', this.createUser.bind(this)); // Route to create a new user
    }

    /**
     * Handles user registration.
     * 
     * @param {express.Request} req - The request object containing user data.
     * @param {express.Response} res - The response object to send results back.
     * 
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async createUser(req, res) {
        try {
            const { email } = req.body;

            // ✅ Validate if the email is provided
            if (!email) {
                return res.status(400).json({ message: "Enter email ID" });
            }

            // ✅ Check if a user with the given email already exists
            const existingUser = await UserModel.User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "User with this email already exists" });
            }

            // ✅ Create a new user in the database
            const user = await UserModel.User.create({ email });

            // ✅ Send a no-reply email notification to the user
            await MailService.sendNoReplyMail(email);

            // ✅ Send success response
            return res.status(201).json({
                message: 'User created successfully',
                data: user
            });

        } catch (err) {
            console.error("❌ Error in createUser:", err);

            // ✅ Handle unexpected server errors
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

// ✅ Export the instantiated router so it can be used in other parts of the application
module.exports = new UserRoutes().router;
