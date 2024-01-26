// 'use strict';
// const multer = require('multer');
// const { GridFSBucket } = require('mongodb');
// const mongoose = require('mongoose');

// // Assuming you are already connected to MongoDB

// const storage = multer.memoryStorage(); // Store files in memory for processing

// const filefilter = (req, file, cb) => {
// 	// Define allowed mimetypes for different file types
// 	const allowedMimeTypes = [
// 		'application/pdf',
// 		'application/msword',
// 		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 	];

// 	if (allowedMimeTypes.includes(file.mimetype)) {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// };

// const upload = multer({
// 	storage: storage,
// 	fileFilter: filefilter,
// });

// const connectToMongoDB = async () => {
// 	try {
// 		await mongoose.connect(
// 			process.env.MONGO_URL,
// 			{
// 				useNewUrlParser: true,
// 				useUnifiedTopology: true,
// 			}
// 		);
// 		console.log('Connected to MongoDB');
// 	} catch (error) {
// 		console.error(
// 			'Error connecting to MongoDB:',
// 			error
// 		);
// 	}
// };

// const saveFileToDB = async (file) => {
// 	const db = mongoose.connection;
// 	const bucket = new GridFSBucket(db, {
// 		bucketName: 'singlefiles', // Replace with your desired bucket name
// 	});

// 	const uploadStream = bucket.openUploadStream(
// 		file.originalname,
// 		{
// 			metadata: {
// 				contentType: file.mimetype,
// 			},
// 		}
// 	);

// 	uploadStream.end(file.buffer);

// 	return new Promise((resolve, reject) => {
// 		uploadStream.on('finish', resolve);
// 		uploadStream.on('error', reject);
// 	});
// };

// module.exports = {
// 	upload,
// 	connectToMongoDB,
// 	saveFileToDB,
// };
