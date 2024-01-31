var fs = require('fs');
var path = require('path');

function hideConsoleLogs(filePath, environment) {
	let content = fs.readFileSync(filePath, 'utf8');
	let logsRemoved = false;

	// Replace console.log statements with an empty string if the environment is 'cleanup'
	if (environment === 'cleanup') {
		content = content.replace(
			/console\.log\([^)]*\);?/g,
			(match) => {
				logsRemoved = true;
				return ''; // Replace with an empty string
			}
		);
	}

	fs.writeFileSync(filePath, content, 'utf8');

	return logsRemoved;
}

function processFiles(directory, environment) {
	let anyLogsRemoved = false;

	fs.readdirSync(directory).forEach((file) => {
		const filePath = path.join(directory, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			const logsRemovedInSubdirectory =
				processFiles(filePath, environment);
			anyLogsRemoved =
				anyLogsRemoved ||
				logsRemovedInSubdirectory;
		} else if (
			stat.isFile() &&
			path.extname(file) === '.js'
		) {
			const logsRemovedInFile = hideConsoleLogs(
				filePath,
				environment
			);
			anyLogsRemoved =
				anyLogsRemoved || logsRemovedInFile;
		}
	});

	// If no console.log statements were removed, shut down the server
	if (
		anyLogsRemoved &&
		environment === 'cleanup'
	) {
		shutdownServer();
	}
}

function shutdownServer() {
	process.exit(0);
}

module.exports = { processFiles };
