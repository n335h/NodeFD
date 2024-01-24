const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	authentication: {
		password: {
			type: String,
			required: true,
		},
		salt: { type: String, required: true },
		// would the registration token be part of their authorisation details inside mongoDB or would it be a separate collection
		// registration_token: {
		// 	type: String,
		// 	required: true,
		// 	select: false,
		// 	// validate: {
		// 	// 	// work out the logic for the registration token
		// 	// 	message: 'Invalid registration token',
		// 	// },
		// 	// default: uuidv4, are we asking for a predefined UUID or they register and are assigned one
		// },
	},
	is_admin: {
		type: Boolean,
		required: true,
	},
	organisation: {
		type: String,
		required: false,
	},
});

const User = mongoose.model('User', userSchema);

const createUser = async (values) => {
	const hashedPassword = await argon2.hash(
		values.authentication.password
	);

	const user = await User.create({
		...values,
		authentication: {
			...values.authentication,
			password: hashedPassword,
			// registration_token: uuidv4(),
		},
	});

	await user.save();

	return user.toObject();
};

const getUserByEmail = async (email) =>
	User.findOne({ email });
const getUserById = async (userId) =>
	User.findById(userId);

module.exports = {
	createUser,
	getUserByEmail,
	getUserById,
};
