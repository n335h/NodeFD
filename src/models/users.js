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

module.exports = User;
