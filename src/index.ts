import App from './providers/App';

// Clean the console before start
App.clearConsole();

// Load the configurations from dotenv
App.loadConfiguration();

// Run the database pool
App.loadDatabase();

// Run the server
App.loadServer();
