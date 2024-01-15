const express = require('express');
const path = require('path');
const router = express.Router();
const {
	registerUser,
} = require('../controllers/registration');
const {
	loginUser,
} = require('../controllers/login');

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

// Get route for rendering the register form
router.get('/register', (req, res) => {
	res.render('index', {
		showLogin: false,
		showRegister: true,
	});
});

// Get route for rendering the login form
router.get('/login', (req, res) => {
	res.render('index', {
		showLogin: true,
		showRegister: false,
	});
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

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;

// Post route for registering a new user
