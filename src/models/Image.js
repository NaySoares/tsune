const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  nick: String,
  nickId: String,
  urlImg: String,
  level: String,
}, { 
  timestamps: true,
})

module.exports = mongoose.model('Image', ImageSchema);