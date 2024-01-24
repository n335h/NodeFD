// routes/auth/logout.js

const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
	// Clear the JWT from the client (e.g., clear cookie or remove from local storage)
	res.clearCookie('token'); // Assuming you set the JWT in a cookie

	res.redirect('/');
});

module.exports = router;
