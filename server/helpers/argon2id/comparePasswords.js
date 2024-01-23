const argon2 = require('argon2');
const crypto = require('crypto');

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
	comparePasswords,
};
