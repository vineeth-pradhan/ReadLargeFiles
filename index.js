const fs = require('fs');
const atob = require('atob');
const sliceSize = 4096 * 1024;
const readPath = process.env.PWD+'/image-greater-than-25-mb.jpg';
const writePath = process.env.PWD+'/image-greater-than-25-mb-complete.jpg';

fs.stat(readPath, (err, stat) => {
  const writeStream = fs.createWriteStream(writePath, { flags: 'a', encoding: 'binary' });
  function readBuffer(offset) {
    const nextSlice = sliceSize + offset + 1;
    fs.open(readPath, 'r', (err, fd) => {
      if(offset < stat.size) {
        fs.read(fd, Buffer.alloc(sliceSize), 0, sliceSize, offset, (err, bytesRead, buffer) => {
          writeStream.write(buffer, () => {
            fs.close(fd, () => {
              if(nextSlice < stat.size) { readBuffer(nextSlice); }
              else { return; }
            });
          })
        });
      }
    });
  }
  readBuffer(0);
});
