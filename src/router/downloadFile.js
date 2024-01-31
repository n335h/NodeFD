const { ObjectId } = require('mongodb');
const express = require('express');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

const router = express.Router();

router.get(
	'/download/:fileId',
	async (req, res) => {
		try {
			const db = mongoose.connection;

			const bucket = new GridFSBucket(db, {
				bucketName: 'singlefiles',
			});

			const fileId = req.params.fileId;
			console.log(fileId);
			console.log(bucket);

			// // If using the mongodb package directly
			const objectId = new ObjectId(fileId);

			// // If using mongoose
			// const objectId = mongoose.Types.ObjectId(fileId);

			console.log(objectId);
			console.log(req);

			const downloadStream =
				bucket.openDownloadStream(objectId);

			downloadStream.on('data', (chunk) => {
				res.write(chunk);
			});

			downloadStream.on('end', () => {
				res.end();
			});

			downloadStream.on('error', (error) => {
				console.error(
					'Error downloading file:',
					error
				);
				res
					.status(500)
					.send('Error downloading file');
			});
		} catch (error) {
			console.error('Unexpected error:', error);
			res.status(500).send('Unexpected error');
		}
	}
);

module.exports = router;
