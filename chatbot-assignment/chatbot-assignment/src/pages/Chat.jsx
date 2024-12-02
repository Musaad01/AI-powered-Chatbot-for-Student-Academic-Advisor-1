import React from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatResponse from "@/components/ChatResponse";
import ChatInput from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";
import PreviousChat from "@/components/PreviousChat";

const Chat = () => {
  const {
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
  } = useChat();

  const handleSend = async (e) => {
    e.preventDefault();
    await sendMessage();
  };

  return (
    <div className="chat">
      <ChatHeader />

      {!isNewChat && (
        <div className="chat-number">
          Chat {currentChatNumber} of {totalChats}
        </div>
      )}

      {isNewChat ? (
        <>
          <ChatResponse botAnswer={botAnswer} />
          <ChatInput
            prompt={prompt}
            onPromptChange={setPrompt}
            onSend={handleSend}
            isLoading={isLoading}
            // Pass navigation buttons as props
            showPreviousButton={showPreviousButton}
            goToPreviousChat={goToPreviousChat}
          />
        </>
      ) : (
        <PreviousChat
          currentChat={currentChat}
          showPreviousButton={showPreviousButton}
          goToPreviousChat={goToPreviousChat}
          showNextButton={showNextButton}
          goToNextChat={goToNextChat}
          startNewChat={startNewChat}
        />
      )}
    </div>
  );
};

export default Chat;
