const fs = require('fs');
const atob = require('atob');
const sliceSize = 4096 * 1024;
const readPath = process.env.PWD+'/image-greater-than-25-mb.jpg';
const writePath = process.env.PWD+'/image-greater-than-25-mb-complete.jpg';

fs.stat(readPath, (err, stat) => {
  function readBuffer(start) {
    const nextSlice = sliceSize + start + 1;
    const readStream = fs.createReadStream(readPath, { encoding: 'binary' });
    const writeStream = fs.createWriteStream(writePath, { flags: 'a', encoding: 'binary' });
    readStream.pipe(writeStream)
    readStream.on('unpipe', () => {
      readBuffer(nextSlice);
    })
  }
  readBuffer(0);
});
