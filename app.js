// app.js
const http = require('http');
const express = require('express');
const appSetup = require('./server/config/appSetup');
const connectDB = require('./server/config/mongoDb/mongoDb');
const routes = require('./server/router/routes');

require('dotenv').config();

const app = appSetup; // Using the appSetup exported from appSetup.js

// Setting up the MongoDB connection
connectDB();

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(
		`Server is running on port ${port}`
	);
});
