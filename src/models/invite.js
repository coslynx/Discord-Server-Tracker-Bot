const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  inviter: {
    type: String,
    required: true,
    ref: 'User',
  },
  invitee: {
    type: String,
    ref: 'User',
  },
  uses: {
    type: Number,
    default: 0,
  },
  maxUses: {
    type: Number,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Invite', InviteSchema);