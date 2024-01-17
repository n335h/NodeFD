const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const app = express();
const router = require('../router/routes');
const staticPaths = require('../config/staticPaths/staticPaths');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(bodyParser.json());

// Setting up the view engine
app.set('view engine', 'ejs');

// Using the static paths
app.use(staticPaths);

// using the routes modules
app.use('/', router);

app.use(
	cors({
		credentials: true,
	})
);

module.exports = app;
