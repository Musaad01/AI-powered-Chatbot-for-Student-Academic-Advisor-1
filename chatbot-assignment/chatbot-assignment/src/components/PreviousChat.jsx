import React from "react";
import ReactMarkdown from "react-markdown";

const PreviousChat = ({
  currentChat,
  showPreviousButton,
  goToPreviousChat,
  showNextButton,
  goToNextChat,
  startNewChat,
}) => {
  return (
    <>
      {currentChat && (
        <>
          <div className="chat-messages">
            <div className="message">
              <strong className="strong">YOU:</strong>{" "}
              <p>{currentChat.human}</p>
            </div>
            <div className="message" style={{ marginTop: 35 }}>
              {currentChat.bot && (
                <>
                  <strong className="strong">BOT:</strong>
                  <ReactMarkdown>{currentChat.bot}</ReactMarkdown>
                </>
              )}
            </div>
          </div>
          <div className="navigation-container">
            <div className="nav-buttons">
              {showPreviousButton && (
                <button className="nav-button" onClick={goToPreviousChat}>
                  Previous
                </button>
              )}
              {showNextButton && (
                <button className="nav-button" onClick={goToNextChat}>
                  Next
                </button>
              )}
            </div>
            <button className="new-chat" onClick={startNewChat}>
              New Chat
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PreviousChat;
