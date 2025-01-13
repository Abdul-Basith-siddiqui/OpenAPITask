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
