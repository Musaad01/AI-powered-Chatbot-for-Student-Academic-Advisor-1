import React from "react";

const ChatInput = ({
  prompt,
  onPromptChange,
  onSend,
  isLoading,
  showPreviousButton,
  goToPreviousChat,
}) => {
  return (
    <form onSubmit={onSend} className="chat-input-form">
      <input
        type="text"
        placeholder="Type your message"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        required
      />
      <div className="input-buttons">
        {showPreviousButton && (
          <button className="nav-button" onClick={goToPreviousChat}>
            Previous
          </button>
        )}
        <button type="submit" disabled={isLoading} className="send-button">
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
