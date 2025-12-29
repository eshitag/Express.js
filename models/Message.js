import mongoose from "mongoose";

//Message Schema
const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  fraudScore: { type: Number, required: true },
  fraudLevel: { type: String, required: true },
  reasons: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
