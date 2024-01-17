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

		console.log(
			'Provided Password:',
			userPassword
		);
		console.log(
			'Stored Hashed Password:',
			storedHashedPassword
		);
		console.log('Stored Salt:', storedSalt);
		console.log(
			'Concatenated Password:',
			concatenatedPassword
		);

		const isPasswordValid = await argon2.verify(
			hashedPassword,
			concatenatedPassword
		);

		console.log(
			'Password Valid:',
			isPasswordValid
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
