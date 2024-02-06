const router = require('express').Router();
const {
	verifyJWT,
} = require('../controllers/auth/jwtGenVer');
const uploadRouter = require('./fileRoutes/uploadFile');
const loginRouter = require('./authRoutes/login');
const registerRouter = require('./authRoutes/register');
const dashboardRouter = require('./dashboard');
const logOutRouter = require('./authRoutes/logout');
const downloadRouter = require('./fileRoutes/downloadFile');
const userRouter = require('../router/userRoutes');
// const downloadRouter = require('../controllers/download');

const {
	getUserByEmail,
} = require('../models/users');
const {
	comparePasswords,
} = require('../controllers/auth/passwordUtils');

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
router.use(userRouter);
router.use(downloadRouter);

// router.use('/download', downloadRouter);

module.exports = router;

// Post route for registering a new user
