const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
  participants: [{ type: String }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Conversation', conversationSchema);