const express = require('express');

const router = express.Router();

const {
	loginUser,
} = require('../../../controllers/auth/login');

// Get route for rendering the login form
router.get('/login', (req, res) => {
	res.render('index', {
		showLogin: true,
		showRegister: false,
	});
});

router.post('/login', loginUser);

module.exports = router;
