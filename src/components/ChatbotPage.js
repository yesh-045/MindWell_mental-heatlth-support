import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate(); // Use the navigate hook to close the modal

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      // Here you would typically call an API to get the chatbot's response
      // For now, we'll just echo the user's message
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `You said: ${inputMessage}`, sender: 'bot' },
        ]);
      }, 1000);
      setInputMessage('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={() => navigate('/')} // Close the modal and navigate back to home
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
        >
          X
        </button>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Chat with our Mental Health Bot</h2>
        <div className="bg-white rounded-lg shadow-md p-4 h-[400px] overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-200 text-blue-900'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow border rounded-l-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-r-lg transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
