const express = require('express');
const path = require('path');

const staticPaths = express.Router();

staticPaths.use(
	'/',
	express.static(
		path.join(__dirname, '/app/views')
	)
);

staticPaths.use(
	'/partials',
	express.static(
		path.join(__dirname, 'views/partials')
	)
);

staticPaths.use(
	'/forms',
	express.static(
		path.join(__dirname, 'views/forms')
	)
);

staticPaths.use(
	'/dashboard',
	express.static(
		path.join(__dirname, 'pages/dashboard')
	)
);

staticPaths.use(
	'/uploads',
	express.static(path.join(__dirname, 'uploads'))
);

module.exports = staticPaths;
