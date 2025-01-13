// import mongoose from 'mongoose';

// const logEntrySchema = new mongoose.Schema({
//   method: {
//     type: String,
//     enum: ['get', 'post', 'put', 'delete', 'patch'],
//   },
//   url: {
//     type: String,
//   },
//   requestData: {
//     type: mongoose.Schema.Types.Mixed,
//   },
//   responseData: {
//     type: mongoose.Schema.Types.Mixed,
//   },
//   statusCode: {
//     type: Number,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const logSchema = new mongoose.Schema({
//   logs: [logEntrySchema],
// });

// const Log = mongoose.model('Log', logSchema);
// export default Log;

import mongoose from "mongoose";

const endpointLogSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ["get", "post", "put", "delete", "patch"],
    required: true,
  },
  requestDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  response: {
    type: mongoose.Schema.Types.Mixed,
  },
  status: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
  },
});

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  specification: {
    type: String,
    required: true,
  },
  endpoints: [endpointLogSchema],
});

const Log = mongoose.model("Log", logSchema);
export default Log;
