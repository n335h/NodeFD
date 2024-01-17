const express = require('express');
const path = require('path');
const router = express.Router();

const loginRouter = require('./auth/login/login');
const registerRouter = require('./auth/register/register');

const {
	getUserByEmail,
} = require('../models/users');
const {
	comparePasswords,
} = require('../helpers/authentication');

// const {
// 	authentication,
// } = require('./authentication');

//// will need to import controllers once they are created

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

module.exports = router;

// Post route for registering a new user
