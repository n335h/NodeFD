const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { SingleFile } = require('../models/file');
const { Readable } = require('stream');
const UUID = require('uuid');

const upload = multer(); // No need for a destination as we won't save to the local file system
const router = express.Router();

router.post(
	'/upload',
	upload.single('file'),
	async (req, res) => {
		try {
			const db = mongoose.connection;

			// Log the details of the uploaded file
			console.log('Uploaded File:', req.file);

			// Save metadata to MongoDB using Mongoose model
			const newFile = new SingleFile({
				userId: req.user.userId,
				file_id: UUID.v4(),
				fileSize: req.file.size,
				fileType: req.file.mimetype,
				fileName: req.file.originalname,
				uploadDate: Date.now(),
			});

			await newFile.save();

			// Log metadata details
			console.log('Saved Metadata:', newFile);

			// Handle GridFSBucket creation after establishing MongoDB connection
			const bucket =
				new mongoose.mongo.GridFSBucket(db, {
					bucketName: 'singlefiles',
				});

			// Create a readable stream from the buffer of the uploaded file
			const bufferStream = new Readable();
			bufferStream.push(req.file.buffer);
			bufferStream.push(null);

			// Create an upload stream using GridFSBucket
			const uploadStream =
				bucket.openUploadStream(
					newFile._id.toHexString(),
					{
						chunkSizeBytes: 1024 * 1024, // Adjust the chunk size as needed
						metadata: {
							userId: req.user.userId,
							fileType: req.file.mimetype,
						},
					}
				);

			// Pipe the buffer stream into the upload stream
			bufferStream.pipe(uploadStream);

			// Log success message
			console.log(
				'File uploaded successfully to MongoDB.'
			);

			res.redirect('/dashboard');
		} catch (error) {
			console.error(
				'Error uploading file:',
				error
			);
			res
				.status(500)
				.send('Error uploading file');
		}
	}
);

module.exports = router;
