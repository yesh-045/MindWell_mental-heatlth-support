import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: 'user' },
      ]);

      try {
        const response = await fetch('http://localhost:5000/process_input', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_input: inputMessage }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        const botResponse = data.response;

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: 'Sorry, something went wrong. Please try again.',
            sender: 'bot',
          },
        ]);
      }

      setInputMessage('');
    }
  };

  // Function to handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
      {/* Increase the width and height to make the popup window larger */}
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-4/5 md:w-1/2 lg:w-2/5 relative">
        {/* Close button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Mental Health Chat
          </h2>
          <div className="bg-gray-100 rounded-lg shadow-inner p-4 h-[500px] overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  style={{ animation: 'fadeIn 0.3s ease-in-out' }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Add this line to handle Enter key press
              className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7V9a1 1 0 112 0v2a1 1 0 11-2 0zm-1-4a1 1 0 112 0v1a1 1 0 11-2 0V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;