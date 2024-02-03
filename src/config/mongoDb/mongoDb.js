const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error(
			'Error connecting to MongoDB:',
			error.message
		);
		process.exit(1); // Exit with failure
	}
};

//creating bucket
let bucket;
mongoose.connection.on('connected', () => {
	var db = mongoose.connections[0].db;
	bucket = new mongoose.mongo.GridFSBucket(db, {
		bucketName: 'singlefiles',
	});
	console.log(bucket);
});

module.exports = connectDB;
