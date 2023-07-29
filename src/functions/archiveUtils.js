const Fs = require('@supercharge/fs');
const Path = require('path');

// this function does not blocks the Node.js event loop when used with @supercharge/fs
async function verifyFile(pathFile) {
  return Fs.exists(pathFile);
}

async function lastUpdatedDate(file) {
  const pathFile = Path.join(__dirname, '..', 'volumes', file);
  const fileExists = await verifyFile(pathFile);

  if (!fileExists) {
    return console.log('File does not exist');
  }

  const { mtime, ctime } = Fs.statSync(pathFile);
  // mtime registers alterations in file content
  console.log(`File data   last modified: ${mtime}`);
  // ctime registers changes in file status, like permissions and renaming
  console.log(`File status last modified: ${ctime}`);

  const response = `last modified: ${mtime}`;

  return response;
}

module.exports = lastUpdatedDate;
