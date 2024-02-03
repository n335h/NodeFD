const argon2 = require('argon2');
const mongoose = require('mongoose');
const User = require('../models/users');

// create user
async function createUser(userData) {
	try {
		const hashedPassword = await argon2.hash(
			userData.authentication.password
		);

		const user = await User.create({
			...userData,
			authentication: {
				...userData.authentication,
				password: hashedPassword,
				// registration_token: uuidv4(),
			},
		});

		return user;
	} catch (error) {
		// Handle password hashing or user creation error
		throw new Error(
			'Error creating user: ' + error.message
		);
	}
}

// get user by email
async function getUserByEmail(email) {
	try {
		const user = await User.findOne({ email });
		return user;
	} catch (error) {
		throw new Error(
			'Error getting user by email: ' +
				error.message
		);
	}
}

// get user by id
async function getUserById(userId, projection) {
	try {
		const user = await User.findById(
			userId,
			projection
		);
		return user;
	} catch (error) {
		throw new Error(
			'Error getting user by id: ' + error.message
		);
	}
}

// edit user by id
async function editUserById(
	userId,
	updateData,
	options
) {
	console.log('Received updateData:', updateData);
	try {
		const user = await User.findByIdAndUpdate(
			userId,
			updateData,
			options
		);

		if (!user) {
			throw new Error('User not found');
		}

		// options.select property is provided (indicating a projection),
		//use the toObject method to convert the user to an object

		if (options && options.select) {
			return user.toObject({
				...options.select,
			});
		}

		return user.toObject({
			virtuals: true,
			versionKey: false,
		});
	} catch (error) {
		throw new Error(
			`Error editing user by ID: ${error.message}`
		);
	}
}

// delete user by id
async function deleteUserById(userId) {
	try {
		const user = await User.findByIdAndDelete(
			userId
		);
		return user;
	} catch (error) {
		throw new Error(
			'Error deleting user by id: ' +
				error.message
		);
	}
}

module.exports = {
	getUserByEmail,
	createUser,
	editUserById,
	deleteUserById,
};
