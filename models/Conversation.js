const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  transcriptionUrl: String,
  recordingUrl: String,
  transcription: String,
  callerNumber: {type: String, default: process.env.TWILIO_PHONE_NUMBER }, 
  callerName: {type: String, default: 'Admin' },
  receiverName: String,
  receiverNumber: String
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;