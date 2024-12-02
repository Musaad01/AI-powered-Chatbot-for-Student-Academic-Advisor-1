import React from "react";
import ReactMarkdown from "react-markdown";

const ChatResponse = ({ botAnswer }) => {
  return (
    <div className="chat-messages">
      <div className="message">
        <strong className="strong">BOT:</strong>{" "}
        {botAnswer && <ReactMarkdown>{botAnswer}</ReactMarkdown>}
      </div>
    </div>
  );
};

export default ChatResponse;
