const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const http = require('http');

const router = require('./server/router/routes');
const connectDB = require('./server/config/mongoDb');
const staticPaths = require('./server/config/staticPaths/staticPaths');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
	cors({
		credentials: true,
	})
);
app.use(compression());
app.use(express.json());

// Setting up the MongoDB connection
connectDB();
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});

// Setting up the view engine
app.set('view engine', 'ejs');

// Using the static paths
app.use(staticPaths);

// using the routes modules
app.use('/', router);

// // Start the server
// app.listen(port, () => {
// 	console.log(
// 		`Server is running at http://localhost:${port}`
// 	);
// });
