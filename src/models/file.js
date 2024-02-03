const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const singleFileSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	fileSize: { type: Number, required: true },
	fileType: { type: String, required: true },
	fileName: { type: String, required: true },
	uploadDate: { type: Date, default: Date.now },
	gridFsFileId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
});

const SingleFile = mongoose.model(
	'SingleFile',
	singleFileSchema
);

//get all files
async function getFiles(userId) {
	try {
		const files = await SingleFile.find(
			{ userId: userId },
			'fileName fileType gridFsFileId'
		);
		console.log(files);
		return files;
	} catch (error) {
		console.error('Error fetching files:', error);
		throw error;
	}
}

module.exports = {
	SingleFile,
	getFiles,
};
