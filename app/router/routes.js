const router = require('express').Router();
const {
	verifyJWT,
} = require('../controllers/jwtGenVer');
const uploadRouter = require('./uploadFile');
const loginRouter = require('./login');
const registerRouter = require('./register');
const dashboardRouter = require('./dashboard');
const logOutRouter = require('./logout');
// const downloadRouter = require('../controllers/download');

const {
	getUserByEmail,
} = require('../models/users');
const {
	comparePasswords,
} = require('../controllers/comparePasswords');

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

// Authorised Routers
router.use(verifyJWT);
router.use(dashboardRouter);
router.use(logOutRouter);
router.use(uploadRouter);

// router.use('/download', downloadRouter);

module.exports = router;

// Post route for registering a new user
