const router = require('express').Router();
const verifyJWT =
	require('../../helpers/auth/jwtGenVer').verifyJWT;

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
