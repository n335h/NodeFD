const express = require('express');
const router = express.Router();
const {
	getUserByEmail,
} = require('../models/users');
const {
	comparePasswords,
} = require('../helpers/authentication');

// Login endpoint
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validate input
		if (!email || !password) {
			console.error(
				'Invalid login request: Missing email or password'
			);
			return res.status(400).json({
				status: 'fail',
				error:
					'Please provide both email and password',
			});
		}

		// Retrieve user from the database
		const user = await getUserByEmail(email);

		// Check if the user exists
		if (!user) {
			console.error(
				`Authentication failed: User not found for email - ${email}`
			);
			return res.status(401).json({
				status: 'fail',
				error:
					'Authentication failed. User not found.',
			});
		}

		// Compare hashed passwords
		const isPasswordValid =
			await comparePasswords(
				password,
				user.authentication.password,
				user.authentication.salt
			);

		if (isPasswordValid) {
			// Passwords match, consider it a successful login
			console.log(
				`User ${email} successfully logged in.`
			);
			res.status(200).json({
				status: 'success',
				message: 'Login successful',
			});
		} else {
			// Passwords don't match
			console.error(
				`Authentication failed for user ${email}: Incorrect password.`
			);
			res.status(401).json({
				status: 'fail',
				error:
					'Authentication failed. Incorrect password.',
			});
		}
	} catch (error) {
		console.error(
			'Error in login endpoint:',
			error
		);
		res.status(500).json({
			status: 'error',
			error: 'Internal Server Error',
		});
	}
};

module.exports = { loginUser };
