const mongoose = require('mongoose');

const singleFileSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	fileSize: { type: Number, required: true },
	fileType: { type: String, required: true },
	fileName: { type: String, required: true },
	uploadDate: { type: Date, default: Date.now },
});

const SingleFile = mongoose.model(
	'SingleFile',
	singleFileSchema
);

async function getFiles(userId) {
	try {
		const files = await SingleFile.find(
			{ userId: userId },
			'fileName'
		);
		console.log(files);
		return files;
	} catch (error) {
		console.error('Error fetching files:', error);
		throw error;
	}
}

module.exports = { SingleFile, getFiles };
