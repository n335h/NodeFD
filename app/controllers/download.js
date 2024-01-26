// const { MongoClient } = require('mongodb');
// const fs = require('fs');

// const url = 'mongodb://localhost:27017';
// const dbName = 'test';

// const client = new MongoClient(url, {
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
// 		const bucket = new db.GridFSBucket(db, {
// 			bucketName: 'files',
// 		});

// 		const uploadStream = bucket.openUploadStream(
// 			'myFile',
// 			{
// 				chunkSizeBytes: 1048576,
// 				metadata: {
// 					field: 'myField',
// 					value: 'myValue',
// 				},
// 			}
// 		);

// 		const readStream =
// 			fs.createReadStream('./myFile');

// 		readStream.pipe(uploadStream);

// 		readStream.on('end', async () => {
// 			const cursor = bucket.find({});
// 			try {
// 				const docs = await cursor.toArray();
// 				console.log(docs);
// 			} catch (error) {
// 				console.error(
// 					'Error querying bucket:',
// 					error
// 				);
// 			} finally {
// 				client.close();
// 			}
// 		});

// 		readStream.on('error', (error) => {
// 			console.error(
// 				'Error reading file stream:',
// 				error
// 			);
// 		});

// 		uploadStream.on('error', (error) => {
// 			console.error(
// 				'Error uploading file to GridFS:',
// 				error
// 			);
// 		});
// 	} catch (error) {
// 		console.error('Unexpected error:', error);
// 	}
// });

// module.exports = client;
