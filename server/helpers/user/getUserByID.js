const User = require('../../models/user');

async function getUserById(userId) {
	try {
		const user = await User.findById(userId);
		return user;
	} catch (error) {
		console.error('Error in getUserById:', error);
		throw error;
	}
}

module.exports = { getUserById };
