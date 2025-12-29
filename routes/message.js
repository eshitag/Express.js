import express from "express";
import Message from "../models/Message.js";

const messageRouter = express.Router();

//Get Messages API
messageRouter.get("/messages", async (req, res) => {
  try {
    const message = await Message.find();
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default messageRouter;
