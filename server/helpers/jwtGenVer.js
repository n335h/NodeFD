const jwt = require('jsonwebtoken');

const secretKey = 'hi';

const generateJWT = (user) => {
	const payload = {
		userId: user._id,
		email: user.email,
	};

	const options = {
		expiresIn: '1h',
	};

	return jwt.sign(payload, secretKey, options);
};

const verifyJWT = (req, res, next) => {
	console.log(req.headers);
	const token = req.headers.cookie.split('=')[1];
	console.log(token);
	if (!token) {
		return res.status(401).json({
			message: 'Unauthorized: Missing token',
		});
	}

	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				message: 'Unauthorized: Invalid token',
			});
		}

		// Attach the decoded user information to the request object
		req.user = decoded;
		next();
	});
};

module.exports = { generateJWT, verifyJWT };
