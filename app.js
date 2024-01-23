// app.js
const http = require('http');
const express = require('express');
const appSetup = require('./server/config/appSetup');
const connectDB = require('./server/config/mongoDb/mongoDb');
const routes = require('./server/router/routes');
const morgan = require('morgan');

const {
	processFiles,
	removeConsoleLogs,
} = require('./server/helpers/cleanUp/removeConsoles');

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
	const projectDirectories = [
		'../NodeFD/client',
		'../NodeFD/server',
	];
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
