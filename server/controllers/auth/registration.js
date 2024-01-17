const express = require('express');
const {
	createUser,
	getUserByEmail,
} = require('../../models/users');
const {
	generateSalt,
	hashPassword,
} = require('../../helpers/argon2id/hashPassword');

const registerUser = async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			email,
			password,
		} = req.body;

		console.log(req.body);

		if (!email || !password) {
			return res.status(400).json({
				status: 'fail',
				error:
					'Please provide an email and password',
			});
		}
		// first and last name validation
		const nameRegex = /^[A-Za-z-]{2,100}$/;
		if (
			!nameRegex.test(first_name) ||
			!nameRegex.test(last_name)
		) {
			return res.status(400).json({
				status: 'fail',
				error:
					'Invalid first_name or last_name format',
			});
		}

		const emailRegex =
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				status: 'fail',
				error: 'Invalid Email',
			});
		}

		const existingUser = await getUserByEmail(
			email
		);

		if (existingUser) {
			return res.status(400).json({
				status: 'fail',
				error: 'User already exists',
			});
		}

		// Generate a random salt
		const salt = await generateSalt();

		const user = await createUser({
			first_name,
			last_name,
			email,
			authentication: {
				salt,
				password: await hashPassword(
					password,
					salt
				),
			},
			is_admin: false,
			organisation: '',
			// is_admin: false, // You may set this based on your requirements
		});

		res.status(201).json({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = { registerUser };
