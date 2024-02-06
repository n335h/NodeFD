
const http = require('http');
const appSetup = require('./src/config/appSetup');
const connectDB = require('./src/config/mongoDb/mongoDb');
const morgan = require('morgan');

require('dotenv').config();

const app = appSetup;
// Setting up the MongoDB connection
connectDB();

// Use morgan for HTTP request logging in development
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Run the script to remove console logs only once on server start in production
if (process.env.NODE_ENV === 'cleanup') {
	const projectDirectories = ['../NodeFD/app'];
	projectDirectories.forEach(
		(projectDirectory) => {
			processFiles(
				projectDirectory,
				process.env.NODE_ENV
			);
		}
	);
}

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {});
