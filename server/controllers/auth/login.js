const express = require('express');
const router = express.Router();
const {
	getUserByEmail,
} = require('../../models/users');
const {
	comparePasswords,
} = require('../../helpers/argon2id/comparePasswords');
const generateJWT =
	require('../../helpers/jwtGenVer').generateJWT;

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
			const token = generateJWT(user);
			const isSecure =
				req.secure ||
				req.headers['x-forwarded-proto'] ===
					'https';

			res.cookie('token', token, {
				httpOnly: true,
				secure: isSecure,
				maxAge: 3600000, // 1 hour expiration
			});

			res.redirect('/dashboard');
		} else {
			// ... handle incorrect password ...
		}
	} catch (error) {
		console.error(
			'Error in login endpoint:',
			error
		);
		res.status(500).json({
			status: 'error',
			error:
				'An error occurred, please try again later.',
		});
	}
};

module.exports = { loginUser };
