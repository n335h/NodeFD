const express = require('express');
const path = require('path');

const staticPaths = express.Router();

staticPaths.use(
	'/',
	express.static(path.join(__dirname, 'views'))
);

staticPaths.use(
	'/partials',
	express.static(
		path.join(__dirname, 'client/partials')
	)
);

staticPaths.use(
	'/forms',
	express.static(
		path.join(__dirname, 'client/forms')
	)
);

module.exports = staticPaths;
