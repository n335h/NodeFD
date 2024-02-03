const router = require('express').Router();
const verifyJWT =
	require('../controllers/auth/jwtGenVer').verifyJWT;
const {
	getUserById,
} = require('../controllers/userControllers'); // Import getUserById
const { getFiles } = require('../models/file'); // Import getFiles

router.use(verifyJWT);

// Dashboard route
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

		// Assuming you have a function to fetch files
		const files = await getFiles(userId);

		res.render('index', {
			showLogin: false,
			showRegister: false,
			showDashboard: true,
			user: user,
			files: files, // Set the files variable
		});
		console.log(files);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
