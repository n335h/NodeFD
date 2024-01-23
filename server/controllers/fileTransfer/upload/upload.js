const upload = require('../../../models/data');
const fileExtLimit = require('../../../middleware/fileExtLimiter');
const fileSizeLimiter = require('../../../middleware/fileSizeLimiter');
const filePayloadExists = require('../../../middleware/filePayloadExists');
const fileTimeStamps = require('../../../middleware/fileTimeStamps');

const uploadFile = async (req, res) => {
	try {
		const newFile = new upload({
			filename: req.file.filename,
			uploadDate: new Date(),
		});

		await newFile.save();
		res
			.status(201)
			.send('File uploaded successfully');
	} catch (error) {
		res.status(500).send('Error uploading file');
	}
};

module.exports = { uploadFile };
