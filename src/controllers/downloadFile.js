// // download files from server

// const fs = require('fs');
// const mongodb = require('mongodb');

// const url =
// 	process.env.MONGO_URL ||
// 	'mongodb://localhost:27017';
// const dbName = 'test';

// const client = new mongodb.MongoClient(url, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// client.connect(async (err) => {
// 	if (err) {
// 		console.error(
// 			'Error connecting to the database:',
// 			err
// 		);
// 		return;
// 	}

// 	try {
// 		const db = client.db(dbName);
// 		const bucket = new mongodb.GridFSBucket(db, {
// 			bucketName: 'singlefiles',
// 		});

// 		const downloadStream =
// 			bucket.openDownloadStreamByName('myFile');

// 		const writeStream =
// 			fs.createWriteStream('./myFile');

// 		downloadStream.pipe(writeStream);

// 		writeStream.on('error', (error) => {
// 			console.error(error);
// 		});

// 		writeStream.on('finish', () => {
// 			console.log(
// 				'File downloaded successfully!'
// 			);
// 			client.close();
// 		});
// 	} catch (error) {
// 		console.error('Error:', error);
// 	}
// });

// module.exports = router;
