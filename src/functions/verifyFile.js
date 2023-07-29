const Fs = require('@supercharge/fs');
const Path = require('path');

// this function does not blocks the Node.js event loop when used with @supercharge/fs
function verifyFile(pathFile) {
  const path = Path.join(__dirname, pathFile);

  return Fs.exists(path);
}

function lastUpdatedDate(file) {
  const { mtime, ctime } = Fs.statSync(file);
  const fileExists = verifyFile(file);

  if (!fileExists) {
    return console.log('File does not exist');
  }

  // mtime registers alterations in file content
  console.log(`File data   last modified: ${mtime}`);
  // ctime registers changes in file status, like permissions and renaming
  console.log(`File status last modified: ${ctime}`);

  return mtime;
}

lastUpdatedDate('./file.txt');
