const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Schedule', ScheduleSchema);