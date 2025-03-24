const mongoose = require('mongoose');
const { USER_COLLECTION } = require('../collection/collection-users');

class UserModel {
    constructor() {
        /**
         * @property {mongoose.Schema} userSchema - Mongoose schema for the User model
         */
        this.userSchema = new mongoose.Schema(
            {
                /**
                 * @property {string} email - User's email address
                 * @required
                 * @unique
                 * @lowercase
                 * @trim
                 */
                email: {
                    type: String,
                    required: true,
                    unique: true,
                    lowercase: true,
                    trim: true,
                    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
                }
            },
            { timestamps: true }
        );

        /**
         * @property {mongoose.Model} User - Mongoose model for the User schema
         */
        this.User = mongoose.model(USER_COLLECTION, this.userSchema);
    }

    /**
     * @method createUser
     * @description Creates a new user with the provided email address
     * @param {string} email - The email address of the user to be created
     * @returns {Promise<mongoose.Document>} - Returns the created user document
     * @throws {Error} - Throws an error if the user creation fails
     */
    async createUser(email) {
        try {
            const newUser = new this.User({ email });
            const user = await newUser.save();
            console.log("✅ User created successfully:", user);
            return user;
        } catch (error) {
            console.error("❌ Error creating user:", error.message);
            throw error;
        }
    }
}

module.exports = new UserModel();
