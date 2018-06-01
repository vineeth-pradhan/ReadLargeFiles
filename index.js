const fs = require('fs');
const sliceSize = 4096 * 1024;
const path = process.env.PWD+"/image-greater-than-25-mb.jpg";
var size = 0;
fs.stat(path, (err, stat) => {
  fs.open(path, 'r', (err, fd) => {
    function readBuffer(offset) {
      const nextSlice = offset + sliceSize + 1;
      if(offset < stat.size) {
        fs.read(fd, Buffer.alloc(sliceSize, 0, 'base64'), 0, sliceSize, offset, (err, bytesRead, buffer) => {
          console.log(stat.size - size)
          console.log(bytesRead)
          size = bytesRead + size;
          if(offset < stat.size) {
            console.log(buffer);
            readBuffer(nextSlice);
          }
        });
      }
    }

    readBuffer(0);
  });
});
