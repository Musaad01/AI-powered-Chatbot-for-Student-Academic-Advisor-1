import express from "express";
import ChatHistory from "../models/ChatHistory.js";
import { gptCompletionRespose } from "../services/openaiService.js";

const router = express.Router();

// Get all chat histories
router.get("/", async (req, res) => {
  try {
    const chats = await ChatHistory.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save new chat and get GPT response
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const generatedText = await gptCompletionRespose(prompt);

    // Save to database
    const newChatHistory = new ChatHistory({
      human: prompt,
      bot: generatedText,
    });

    await newChatHistory.save();

    res.json({ generatedText });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
