import { useState, useEffect } from "react";
import axios from "axios";

export const useChat = () => {
  const [prompt, setPrompt] = useState("");
  const [botAnswer, setBotAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistories, setChatHistories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Fetch chat histories when component loads
  useEffect(() => {
    const fetchChatHistories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/chat");
        const data = res.data;
        setChatHistories(data);
        // Set currentIndex to represent "new chat" mode
        setCurrentIndex(-1); // Changed from data.length to -1
      } catch (error) {
        console.error("Error fetching chat histories:", error);
      }
    };

    fetchChatHistories();
  }, []);

  const sendMessage = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        prompt,
      });
      const responseMessage = res.data.generatedText;
      setBotAnswer(responseMessage);
      // Update chatHistories with the new chat at the beginning
      const newChat = {
        human: prompt,
        bot: responseMessage,
      };
      setChatHistories((prev) => [newChat, ...prev]);
      // setCurrentIndex(0); // Set to the latest chat
      setPrompt("");
    } catch (error) {
      setBotAnswer("Something went wrong");
      console.error("Error in sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousChat = () => {
    if (currentIndex < chatHistories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToNextChat = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      // If at the latest chat, reset to new chat mode
      setCurrentIndex(-1);
    }
  };

  const startNewChat = () => {
    setCurrentIndex(-1); // Reset to "new chat" mode
    setBotAnswer("");
    setPrompt("");
  };

  // Adjusted isNewChat calculation
  const isNewChat = currentIndex === -1;

  // Control the visibility of navigation buttons
  const showPreviousButton = currentIndex < chatHistories.length - 1;
  const showNextButton = currentIndex >= 0;

  // Get the current chat based on the index
  const currentChat = isNewChat ? null : chatHistories[currentIndex];

  // Update botAnswer and prompt when currentIndex changes
  useEffect(() => {
    if (isNewChat) {
      setBotAnswer("");
      setPrompt("");
    } else if (currentChat) {
      setBotAnswer(currentChat.bot);
      setPrompt(currentChat.human);
    }
  }, [currentIndex, isNewChat]);

  // Compute current chat number for display
  const currentChatNumber = isNewChat ? null : currentIndex + 1;
  const totalChats = chatHistories.length;

  return {
    prompt,
    setPrompt,
    botAnswer,
    isLoading,
    sendMessage,
    goToPreviousChat,
    goToNextChat,
    startNewChat,
    isNewChat,
    showPreviousButton,
    showNextButton,
    currentChat,
    currentChatNumber,
    totalChats,
  };
};
