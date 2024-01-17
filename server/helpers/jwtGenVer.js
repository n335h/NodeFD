const jwt = require('jsonwebtoken');

const jwtSecret = 'hello';

const generateJWT = (user) => {
	const payload = {
		email: user.email,
	};

	const options = {
		expiresIn: '1h',
	};

	return jwt.sign(payload, jwtSecret, options);
};

const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, jwtSecret);
		return decoded;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = { generateJWT, verifyToken };
