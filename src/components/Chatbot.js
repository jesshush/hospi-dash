// src/components/ChatBotIframe.js
import React from 'react';

const ChatBotIframe = ({ show, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0',
        right: '0',
        width: '400px',
        height: show ? '700px' : '0',
        transition: 'height 0.3s ease',
        zIndex: '1000',
      }}
    >
      {show && (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/dvS3svWzFk4RSjRHdFIUN"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="ChatBot"
        ></iframe>
      )}
      {/* Removed the button from here */}
    </div>
  );
};

export default ChatBotIframe;
