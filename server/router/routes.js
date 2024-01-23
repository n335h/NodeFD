const express = require('express');
const path = require('path');
const router = express.Router();
// const extractInfo = require('../middleware/extractInfo');

const {
	verifyJWT,
} = require('../helpers/jwtGenVer');

const loginRouter = require('./auth/login/login');
const registerRouter = require('./auth/register/register');
// const {
// 	login,
// } = require('../controllers/auth/login/login');

const {
	getUserByEmail,
} = require('../models/users');
const {
	comparePasswords,
} = require('../helpers/authentication');

// Rendering the index page with the login form by default on server connect
router.get('/', (req, res) => {
	try {
		res.render('index', {
			showLogin: true,
			showRegister: false,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

router.get('/users/:email', async (req, res) => {
	const email = req.params.email;

	try {
		const user = await getUserByEmail(email);
		res.status(200).json({ user });
	} catch (error) {
		res
			.status(500)
			.json({ error: error.message });
	}
});
router.use(loginRouter);
router.use(registerRouter);

router.use(verifyJWT);

//dashboard route
router.get('/dashboard', (req, res) => {
	try {
		res.render('index', {
			showLogin: false,
			showRegister: false,
			showDashboard: true,
			user: req.user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;

// Post route for registering a new user
