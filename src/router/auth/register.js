const express = require('express');
const router = express.Router();

const {
	registerUser,
} = require('../../controllers/auth/registration');

// Get route for rendering the register form
router.get('/register', (req, res) => {
	res.render('index', {
		showLogin: false,
		showRegister: true,
	});
});

router.post('/register', registerUser);

module.exports = router;
