const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  discriminator: {
    type: String,
    required: true,
  },
  messageCount: {
    type: Number,
    default: 0,
  },
  voiceTime: {
    type: Number,
    default: 0,
  },
  inviteCount: {
    type: Number,
    default: 0,
  },
  inviteAcceptedCount: {
    type: Number,
    default: 0,
  },
  joinDate: {
    type: Date,
    required: true,
  },
  leaveDate: {
    type: Date,
  },
});

module.exports = mongoose.model('User', UserSchema);