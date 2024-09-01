
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getSocket } from '../../lib/socket.config';
import { v4 as uuidV4 } from 'uuid';

function ChatBase() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const currentUserName = 'TestName'; // Replace with the actual user's name or ID

  // Memoize the socket instance
  const socket = useMemo(() => {
    const socketInstance = getSocket();
    
    // Setup authentication before connecting
    socketInstance.auth = { room: '123' };

    return socketInstance.connect();
  }, []);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [socket]);

  // Memoize handleSendMessage to prevent unnecessary re-renders
  const handleSendMessage = useCallback(() => {
    if (inputValue.trim()) {
      const newMessage = { name: currentUserName, id: uuidV4(), text: inputValue };
      socket.emit('message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue(''); // Clear the input field
    }
  }, [socket, inputValue]);

  return (
    <div className="flex flex-col h-screen p-4 bg-purple-100 text-gray-800">
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 max-w-xs break-words rounded-md ${
                message.name === currentUserName
                  ? 'bg-purple-400 self-end text-right'
                  : 'bg-purple-200 self-start text-left'
              }`}
            >
              <strong>{message.name}:</strong> {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-md bg-purple-50 text-gray-800"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-r-md"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBase;
