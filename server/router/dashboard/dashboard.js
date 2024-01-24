const router = require('express').Router();
const verifyJWT =
	require('../../helpers/auth/jwtGenVer').verifyJWT;
const {
	getUserById,
} = require('../../models/users'); // Import getUserById

router.use(verifyJWT);

//dashboard route
router.get('/dashboard', async (req, res) => {
	try {
		const userId = req.user.userId;
		const user = await getUserById(userId);

		if (!user) {
			console.error('User not found');
			return res
				.status(404)
				.send('User not found');
		}

		res.render('index', {
			showLogin: false,
			showRegister: false,
			showDashboard: true,
			user: user, // Pass the fetched user data to the template
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
