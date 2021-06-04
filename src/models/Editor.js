const mongoose = require('mongoose');

const EditorSchema = new mongoose.Schema({
  editor: String,
  editorId: String,
  points: Number, 
  victory: Number, 
  urlImg: String,
  level: String,
}, { 
  timestamps: true,
})

module.exports = mongoose.model('Editor', EditorSchema);