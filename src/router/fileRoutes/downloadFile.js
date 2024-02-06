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
			console.log('fileId:', fileId);
			const db = mongoose.connection;

			const mongooseObjectId = new ObjectId(
				fileId
			);
			console.log(
				'mongooseObjectId:',
				mongooseObjectId
			);

			// Retrieve the file metadata from the files.files collection
			const fileChunks = await db
				.collection('files.files')
				.findOne({ filename: mongooseObjectId });

			console.log('fileMetadata:', fileChunks);

			if (!fileChunks) {
				console.error('File not found');
				return res
					.status(404)
					.send('File not found');
			}

			// Retrieve the file data chunks from the files.chunks collection
			const bucket =
				new mongoose.mongo.GridFSBucket(db, {
					bucketName: 'files.chunks',
				});

			// Set the appropriate headers
			res.setHeader(
				'Content-Type',
				fileMetadata.contentType
			);
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=${fileMetadata.filename}`
			);

			// Create a readable stream for the file data chunks and pipe it to the response
			const downloadStream =
				bucket.openDownloadStream(
					mongooseObjectId
				);
			downloadStream.pipe(res);
		} catch (error) {
			console.error('Unexpected error:', error);
			res.status(500).send('Unexpected error');
		}
	}
);

module.exports = router;
