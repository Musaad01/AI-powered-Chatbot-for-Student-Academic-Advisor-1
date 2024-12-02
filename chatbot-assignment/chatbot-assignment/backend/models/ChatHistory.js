import mongoose from 'mongoose';

const ChatHistorySchema = new mongoose.Schema({
  human: {
    type: String,
    required: true,
    trim: true
  },
  bot: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ChatHistory', ChatHistorySchema);