const nodemailer = require("nodemailer");

//pass: "Iloveparu@123", // Add Ethereal email password here
/**
 * @class MailService
 * @description Handles sending emails using Nodemailer
 */
class MailService {
    /**
     * @constructor
     * @description Initializes the Nodemailer transporter with SMTP settings
     */
    constructor() {
        /**
         * @private
         * @type {nodemailer.Transporter}
         * @description Nodemailer transporter instance configured for SMTP
         */
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, // ✅ Use 587 instead of 465
            secure: false,
            auth: {
                user: "", 
                pass:""
            },
        });
    }

    /**
     * @method sendNoReplyMail
     * @description Sends a no-reply email
     * @param {string} email - Recipient's email address
     * @returns {Promise<{success: boolean, messageId?: string, error?: string}>} 
     * Resolves with success status and message ID if sent, rejects with error if failed
     */
    async sendNoReplyMail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`📧 Sending email to: ${email}`);

                const info = await this.transporter.sendMail({
                    from: '"krishvedant@publishonyourown.com', // Sender
                    replyTo: "krishvedant@publishonyourown.com", // Reply-To header
                    to: email, // Recipient
                    subject: "Test Mail", // Email subject
                    text: "This is a test email.", // Plain text body
                    html: "<h2>Test Email</h2><p>This is a <b>test</b> email.</p>", // HTML content
                    
                });


                console.log("✅ krishvedant@publishonyourown.com", info.messageId);
                resolve({ success: true, messageId: info.messageId });
            } catch (error) {
                console.error("❌ Error sending no-reply email:", error);
                reject({ success: false, error: error.message });
            }
        });
    }
}

/**
 * @exports mailService
 * @description Singleton instance of the MailService class for sending emails
 */
// const mailService = new MailService();

// For testing
// mailService.sendNoReplyMail("2001akhilanilkumar@gmail.com")
//     .then((response) => console.log("📨 Email Response:", response))
//     .catch((error) => console.log("⚠️ Email Failed:", error));

module.exports = new MailService();
