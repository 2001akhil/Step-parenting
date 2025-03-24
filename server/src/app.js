const express = require('express');
const cors=require('cors');
const UserRoutes = require('./routes/user'); // Import User Routes

/**
 * @class App
 * @description Class-based Express app setup
 */
class App {
    constructor() {
        this.app = express(); // Initialize Express app
        this.setConfig(); // Set middleware configurations
        this.setCors(); // Define CORS policy
        this.setRoutes(); // Define routes
        this.setupRoutes(); // Set API routes
        this.handleErrors(); // Define error-handling middleware
    }

    /**
     * @method setConfig
     * @description Configure middleware such as JSON parsing
     */
    setConfig() {
        this.app.use(express.json()); // Enable JSON parsing for request bodies
    }

    /**
     * @method setCors
     * @description Configure CORS settings for security
     */
    // setCors() {
    //     this.app.use((req, res, next) => {
    //         const allowedOrigins = ['*'];
    //         const origin = req.headers.origin 
            
    
    //         console.log('Request Host:', req.headers.host);  // ✅ Logs the server host
    //         console.log('Request Origin:', origin);  // ✅ Logs the client's origin
    
    //         // Allow same-origin requests (no origin header)
    //         if (origin=="undefined"||!origin) {
    //             console.log('No Origin header found. Allowing request.');

    //             return res.status(403).json({msg:"Sorry, you can't connect to this server."})
    //         }
    
    //         // Check if the request origin is allowed
    //         if (!allowedOrigins.includes(origin)) {
    //             return res.status(403).json({ message: "Sorry, you can't connect to this server." });
    //         }
    
    //         // Apply CORS middleware dynamically
    //         cors({
    //             origin: (requestOrigin, callback) => {
    //                 if (allowedOrigins.includes(requestOrigin)) {
    //                     callback(null, true); // Allow request
    //                 } else {
    //                     callback(new Error("Not allowed by CORS")); // Reject request
    //                 }
    //             },
    //             methods: ['POST'],
    //             credentials: false
    //         })(req, res, next);
    //     });
    // }
    
    setCors() {
        this.app.use(cors()); 
    }
    

    /**
     * @method setRoutes
     * @description Define application routes
     */
    setRoutes() {
        /**
         * @route GET /test
         * @description Test endpoint
         * @returns {Object} JSON response with "Hello World"
         */
        this.app.get('/test', (req, res) => {
            res.send('Hello World');
        });
    }

    /**
     * @method setupRoutes
     * @description Set up additional API routes
     */
    setupRoutes() {
        this.app.use('/api/v1/users', UserRoutes); // User API routes
    }

    /**
     * @method handleErrors
     * @description Handles errors (404 & 500)
     */
    handleErrors() {
        /**
         * @route 404 Not Found
         * @description Handles unknown routes
         */
        this.app.use((req, res, next) => {
            res.status(404).json({ error: 'Not Found' });
        });

        /**
         * @route 500 Internal Server Error
         * @description Global error-handling middleware
         */
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    }
}

/**
 * @exports App
 * @description Export the App class for use in `server.js`
 */
module.exports = App;