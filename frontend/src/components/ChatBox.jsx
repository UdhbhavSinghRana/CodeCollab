import React, { useState } from 'react';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      // socket.emit("room-chat-message", roomDetails.roomCode, newMessage);
      setMessages((prevMessages) => [...prevMessages, { user: "You", text: input }]);
      setInput('');
    }
  };

  //use effect to be used for creating a event that hear a new message from the room

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleToggle}
        className="bg-blue-500 text-white p-3 rounded-full focus:outline-none shadow-lg"
      >
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg mt-4 w-80 h-96 flex flex-col">
          <div className="flex-1 p-4 overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className="message border-bottom border-secondary p-2">
              <strong>{message.user}:</strong> {message.text}
            </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 bg-blue-500 text-white w-full p-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
