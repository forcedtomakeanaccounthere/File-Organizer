import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  modified: { type: Date, required: true },
  created: { type: Date, required: true },
  folder: { type: String, required: true },
  tags: { type: [String], default: [] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shared: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
  favorited: { type: Boolean, default: false },
  content: { type: String },
  thumbnail: { type: String, default: "" },
  fileUrl: { type: String, required: true },
});

export default mongoose.models.File || mongoose.model("File", FileSchema);
