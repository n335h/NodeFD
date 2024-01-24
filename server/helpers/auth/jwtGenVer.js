const jwt = require('jsonwebtoken');

const secretKey = 'hi';

const generateJWT = (user) => {
	const payload = {
		userId: user._id,
		email: user.email,
	};

	const options = {
		expiresIn: '30min',
	};

	return jwt.sign(payload, secretKey, options);
};

const verifyJWT = (req, res, next) => {
	const token = req.cookies.token; // Assuming the cookie name is 'token'

	if (!token) {
		return res.status(401).json({
			message: 'Unauthorized: No token provided',
		});
	}

	// Verify the JWT token
	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				message: 'Unauthorized: Invalid token',
			});
		}

		// Attach the decoded user information to the request object
		req.user = decoded;
		console.log('Decoded user:', req.user);
		next();
	});
};

module.exports = { generateJWT, verifyJWT };
