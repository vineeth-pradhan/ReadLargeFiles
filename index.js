// Libraries
const fs = require('fs');
const atob = require('atob');

// Constants
const sliceSize = 4096 * 1024;
const readPath = process.env.PWD+'/sample-large-file.jpg';
const writePath = process.env.PWD+'/complete.jpg';

// Initializing streams
const writeStream = fs.createWriteStream(writePath, { flags: 'a', encoding: 'binary' });
const readStream = fs.createReadStream(readPath, { encoding: 'base64', start: 0 });

readStream.read(sliceSize);
readStream.on('data', data => { writeStream.write(atob(data)); });
