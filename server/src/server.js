// Initiate the server
// The server is initiated by creating a new instance of the Server class.

const App = require('./app');
require('./connection/db');

/**
 * @class Server
 * @description Initializes and starts the Express server
 */
class Server {
    /**
     * @constructor
     * @description Creates an instance of the Server class, initializes the app, and starts the server.
     */
    constructor() {
        /**
         * @property {App} appInstance - Instance of the App class
         */
        this.appInstance = new App();
        this.start();
    }

    /**
     * @method start
     * @description Starts the Express server on a specified port
     */
    start() {
        
        /**
         * @constant {number} port - The port on which the server listens
         */
        const port = process.env.PORT || 3001;
        this.appInstance.app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    }
}

// Start the server
new Server();
