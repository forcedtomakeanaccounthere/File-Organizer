import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  file: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
  message: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);
export default Activity;
