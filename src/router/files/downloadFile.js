const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const {
	SingleFile,
} = require('../../models/file');
const { file } = require('@babel/types');

const router = express.Router();

router.get(
	'/download/:fileId',
	async (req, res) => {
		try {
			const fileId = req.params.fileId;
			console.log(fileId);

			// Create a MongoDB ObjectId
			const mongooseObjectId = new ObjectId(
				fileId
			);

			// Find the file metadata by ObjectId in the singlefiles collection
			const fileMetadata =
				await SingleFile.findById(
					mongooseObjectId
				);

			if (!fileMetadata) {
				console.error('File not found');
				return res
					.status(404)
					.send('File not found');
			}

			const db = mongoose.connection;

			// Handle GridFSBucket creation after establishing MongoDB connection
			const bucket =
				new mongoose.mongo.GridFSBucket(db, {
					bucketName: 'singlefiles.files',
				});

			// Use the GridFS file ID from the metadata to find the file in the files collection
			const gridFsFileId = new ObjectId(
				fileMetadata.gridFsFileId
			);

			// Create a readable stream for the file
			const downloadStream =
				bucket.openDownloadStream(gridFsFileId);

			// Set the appropriate headers
			res.setHeader(
				'Content-Type',
				fileMetadata.fileType
			);
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=${fileMetadata.fileName}`
			);
			// Pipe the file stream to the response
			downloadStream.pipe(res);
		} catch (error) {
			console.error('Unexpected error:', error);
			res.status(500).send('Unexpected error');
		}
	}
);

module.exports = router;
