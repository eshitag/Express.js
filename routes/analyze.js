import express from "express";
import Message from "../models/Message.js";
import {
  symbolSubstitutionCheck,
  urgencyLanguageCheck,
  otpCheck,
  personalInfoCheck,
  deliveryCheck,
} from "../utils/fraudRules.js";

const analyzeRouter = express.Router();

//Route
analyzeRouter.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  //Run all checks
  const checks = [
    symbolSubstitutionCheck(message),
    urgencyLanguageCheck(message),
    otpCheck(message),
    personalInfoCheck(message),
    deliveryCheck(message),
  ];

  // Aggregate results
  const fraudScore = checks.reduce((sum, c) => sum + c.score, 0);
  const reasons = checks.flatMap((c) => c.reasons);

  // Determine fraud level
  let fraudLevel = "low";
  if (fraudScore > 30 && fraudScore <= 70) fraudLevel = "medium";
  if (fraudScore > 70) fraudLevel = "high";

  try {
    const savedMessage = await Message.create({
      message,
      fraudScore,
      fraudLevel,
      reasons,
    });

    res.json(savedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

export default analyzeRouter;
