import mongoose from 'mongoose';

const collection = 'Messages';

const schema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const MessageModel = mongoose.model(collection, schema);

export default MessageModel;