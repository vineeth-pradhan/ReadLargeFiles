const fs = require('fs');
const atob = require('atob');
const sliceSize = 4096 * 1024;
const readPath = process.env.PWD+'/sample-large-file.jpg';
const writePath = process.env.PWD+'/complete.jpg';

fs.stat(readPath, (err, stat) => {
  function readBuffer() {
    const readStream = fs.createReadStream(readPath, { encoding: 'binary' });
    const writeStream = fs.createWriteStream(writePath, { flags: 'a', encoding: 'binary' });
    readStream.pipe(writeStream)
  }
  readBuffer();
});
