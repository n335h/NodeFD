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
			password + salt, // Concatenate password and salt
			{ type: argon2.argon2i } // Specify the type if needed
		);
		
		
		
		return hashedPassword;
	} catch (error) {
		console.error(
			'Error hashing password: ',
			error
		);
		throw error;
	}
};

module.exports = { generateSalt, hashPassword };
