const MongoClient =
	require('mongodb').MongoClient;
const fs = require('fs');
const mongodb = require('mongodb');

const url =
	process.env.MONGO_URL ||
	'mongodb://localhost:2701';
const dbName = 'test';

const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect(async (err) => {
	if (err) {
		console.error(
			'Error connecting to the database:',
			err
		);
		return;
	}

	try {
		const db = client.db(dbName);
		const bucket = new mongodb.GridFSBucket(db, {
			bucketName: 'singlefiles',
		});

		const uploadStream = bucket.openUploadStream(
			'myFile',
			{
				chunkSizeBytes: 1048576,
				metadata: {
					field: 'myField',
					value: 'myValue',
				},
			}
		);

		const readStream =
			fs.createReadStream('./myFile');

		readStream.pipe(uploadStream);

		readStream.on('end', async () => {
			// File upload is complete, now you can query the bucket
			const cursor = bucket.find({});
			try {
				const docs = await cursor.toArray();
				console.log(docs);
			} catch (error) {
				console.error(
					'Error querying bucket:',
					error
				);
			} finally {
				// Close the MongoDB client connection
				client.close();
			}
		});

		// Handle errors on readStream
		readStream.on('error', (error) => {
			console.error(
				'Error reading file stream:',
				error
			);
		});

		// Handle errors on uploadStream
		uploadStream.on('error', (error) => {
			console.error(
				'Error uploading file to GridFS:',
				error
			);
		});
	} catch (error) {
		console.error('Unexpected error:', error);
	}
});
