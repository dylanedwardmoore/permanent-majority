const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  created: Date,
  transcriptionUrl: String,
  recordingUrl: String,
  transcription: String,
  callerNumber: String,
  callerName: String,
  receiverName: String,
  receiverNumber: String
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
