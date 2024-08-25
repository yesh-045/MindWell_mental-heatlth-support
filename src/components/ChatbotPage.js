import React, { useState } from 'react';

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([...messages, { text: inputMessage, sender: 'user' }]);
            // Here you would typically call an API to get the chatbot's response
            // For now, we'll just echo the user's message
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { text: `You said: ${inputMessage}`, sender: 'bot' }]);
            }, 1000);
            setInputMessage('');
        }
    };

    return (
        <div className='max-w-[800px] mx-auto py-12'>
            <h2 className='text-3xl font-bold mb-4'>Chat with our Mental Health Bot</h2>
            <div className="bg-white rounded-lg shadow-md p-4 h-[400px] overflow-y-auto mb-4">
                {messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
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
                    className="flex-grow border rounded-l-lg p-2"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatbotPage;