// const router = require('express').Router();

// // Get user info

// // based on logged in user - use the user ID to get the user info from the database
// // then send the user info back to the client

// router.get(
// 	'/profile/:userId',
// 	async (req, res) => {
// 		try {
// 			const userId = req.params.userId;
// 			const user = await getUserById(userId);

// 			console.log('User by ID:', user);

// 			if (!user) {
// 				return res
// 					.status(404)
// 					.json({ error: 'User not found' });
// 			}

// 			res.status(200).json({ user });
// 		} catch (error) {
// 			console.error(error);
// 			res
// 				.status(500)
// 				.json({ error: 'Internal Server Error' });
// 		}
// 	}
// );

// module.exports = router;
