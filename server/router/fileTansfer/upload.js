const express = require('express');

const router = express.Router();

// File upload route
app.post(
	'/upload',
	upload.single('file'),
	async (req, res) => {
		try {
			const newFile = new File({
				filename: req.file.filename,
				uploadDate: new Date(),
			});

			await newFile.save();
			res
				.status(201)
				.send('File uploaded successfully');
		} catch (error) {
			res
				.status(500)
				.send('Error uploading file');
		}
	}
);
