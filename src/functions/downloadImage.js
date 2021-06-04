const https = require('https');
const fs = require('fs');
const path = require('path');


function Download(url, fileName) {
  console.log(url, fileName);
  const destination = path.resolve(__dirname, '..', 'images', `${fileName}`)

  https.get(url, function(res) {
    const fileStream = fs.createWriteStream(`${destination}`) // gambiarra mais feia que bater em mãe
    res.pipe(fileStream)
    fileStream.on('finish', function() {
      fileStream.close();
      console.log('baixado!')
    })
  })
}

module.exports = Download();