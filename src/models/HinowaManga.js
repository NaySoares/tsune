const mongoose = require('mongoose');

const HinowaMangaSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    posted: Boolean,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('HinowaManga', HinowaMangaSchema);
