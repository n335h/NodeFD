const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	filename: String,
	uploadDate: Date,
});

// Create a model from the schema
const File = mongoose.model('File', fileSchema);
