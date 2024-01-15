const mongoose = require('mongoose');
require('dotenv').config();



const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGO_URL,
			{}
		);
		console.log('MongoDB Connected');
	} catch (error) {
		console.error(
			'Error connecting to MongoDB:',
			error.message
		);
		process.exit(1); // Exit with failure
	}
};

module.exports = connectDB;
