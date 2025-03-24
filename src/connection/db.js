const mongoose = require('mongoose');

/**
 * @class Database
 * @description Handles MongoDB connection with automatic reconnection attempts
 */
class Database {
    /**
     * @constructor
     * @description Initializes database connection and retry mechanism
     */
    constructor() {
        /**
         * @private
         * @type {number}
         * @description Maximum number of retry attempts for reconnecting to MongoDB
         */
        this.maxReconnectTries = 5;

        /**
         * @private
         * @type {number}
         * @description Counter for the number of reconnection attempts
         */
        this.retry = 0;

        // Attempt initial connection
        this.connect()
            .then(() => console.log("✅ MongoDB connection established"))
            .catch(() => console.error("🔥 Failed to connect to MongoDB after multiple attempts"));
    }

    /**
     * @method connect
     * @description Establishes a connection to MongoDB and retries if it fails
     * @returns {Promise<void>} Resolves if connection is successful, rejects if maximum retries are exceeded
     */
    connect() {
        return new Promise((resolve, reject) => {
            /**
             * @function attemptConnection
             * @description Tries to connect to MongoDB and retries upon failure
             */
            const attemptConnection = () => {
                mongoose.connect(`mongodb+srv://krishvedant:64BRjRqM0ZyidWQU@cluster0.ngk1i.mongodb.net/Step_parenting`)
                    .then(() => {
                        console.log('✅ MongoDB connected successfully');
                        resolve(); // Resolve the promise on success
                    })
                    .catch((error) => {
                        this.retry++;
                        console.error(`❌ MongoDB connection error (Attempt ${this.retry}/${this.maxReconnectTries}):`, error.message);

                        if (this.retry >= this.maxReconnectTries) {
                            console.error("🔥 Maximum retry attempts reached. Exiting...");
                            reject(error);
                            process.exit(1); // Exit process after max retries
                        } else {
                            console.log(`⏳ Retrying in 3 seconds...`);
                            setTimeout(attemptConnection, 3000); // Retry after 3 seconds
                        }
                    });
            };

            attemptConnection(); // Start the first connection attempt
        });
    }
}

/**
 * @exports Database
 * @description Singleton instance of the Database class for maintaining a persistent connection
 */
module.exports = new Database();
