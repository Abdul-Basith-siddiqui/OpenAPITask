import mongoose from 'mongoose';

const logEntrySchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['get', 'post', 'put', 'delete', 'patch'], 
  },
  url: {
    type: String,
  },
  requestData: {
    type: mongoose.Schema.Types.Mixed, 
  },
  responseData: {
    type: mongoose.Schema.Types.Mixed, 
  },
  statusCode: {
    type: Number, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const logSchema = new mongoose.Schema({
  logs: [logEntrySchema], 
});


const Log = mongoose.model('Log', logSchema);
export default Log;
