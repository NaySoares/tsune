const mongoose = require('mongoose');

const ListNovelSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String, 
  img: String, 
  dateUpdate: String,
  category: Array,
  posted: Boolean
}, { 
  timestamps: true,
})

module.exports = mongoose.model('ListNovel', ListNovelSchema);