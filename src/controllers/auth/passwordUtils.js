const argon2 = require('argon2');
const crypto = require('crypto');

// Function to generate a random salt
const generateSalt = () => {
	return crypto.randomBytes(32).toString('hex');
};

// Function to hash the password
const hashPassword = async (password, salt) => {
	try {
		const hashedPassword = await argon2.hash(
			password + salt,
			{ type: argon2.argon2i }
		);

		return hashedPassword;
	} catch (error) {
		console.error(
			'Error hashing password:',
			error
		);
		throw error;
	}
};

const comparePasswords = async (
	userPassword,
	storedHashedPassword,
	storedSalt
) => {
	try {
		const concatenatedPassword =
			userPassword + storedSalt;

		hashedPassword = await argon2.hash(
			concatenatedPassword,
			{ type: argon2.argon2i }
		);

		const isPasswordValid = await argon2.verify(
			hashedPassword,
			concatenatedPassword
		);

		return isPasswordValid;
	} catch (error) {
		console.error(
			'Error comparing passwords:',
			error
		);
		throw error;
	}
};

module.exports = {
	generateSalt,
	hashPassword,
	comparePasswords,
};
