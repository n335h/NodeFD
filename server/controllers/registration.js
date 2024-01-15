const express = require('express');
const {
	createUser,
	getUserByEmail,
} = require('../models/users');
const {
	generateSalt,
	hashPassword,
} = require('../helpers/authentication');

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
