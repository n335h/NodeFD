const express = require('express');
const router = express.Router();
const User = require('../models/users');
const {
	getUserByEmail,
	createUser,
	editUserById,
	deleteUserById,
} = require('../controllers/userControllers');
const {
	registerUser,
} = require('../controllers/auth/registration');

// limiting the data pulled from the database
const projection = {
	_id: 1,
	first_name: 1,
	last_name: 1,
	email: 1,
	orginisation: 1,
};

// create a new user

// router.post('/createUser', registerUser);

// get all users
router.get('/users', async (req, res) => {
	try {
		const users = await User.find({}, projection);
		res.json(users);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'Internal Server Error' });
	}
});

//get user by email
router.get('/users/:email', async (req, res) => {
	try {
		const email = req.params.email;
		const user = await getUserByEmail(
			email,
			projection
		);
		res.json(user);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'Internal Server Error' });
	}
});

// get user by id
router.get('/user/:userId', async (req, res) => {
	const userId = req.params.userId;
	const user = await User.findById(
		userId,
		projection
	);
	res.json(user);
});

// edit user by id
router.patch(
	'/edit/:userId',
	async (req, res) => {
		const userId = req.params.userId;
		const updateData = req.body;

		const user = await editUserById(
			userId,
			updateData,
			{
				new: true,
				select: projection,
			}
		);

		if (!user) {
			return res
				.status(404)
				.json({ message: 'User not found' });
		}
		res.json(user);
	}
);

// delete user by id
router.delete(
	'/delete/:userId',
	async (req, res) => {
		const userId = req.params.userId;
		const user = await deleteUserById(
			userId,
			projection
		);
		res.json(user);
	}
);

module.exports = router;
