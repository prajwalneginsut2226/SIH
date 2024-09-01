

import React, { useEffect, useMemo } from 'react';
import { getSocket } from '../lib/socket.config';
import { v4 as uuidV4 } from 'uuid';

function ChatBase() {
  const socket = useMemo(() => {
    const socketInstance = getSocket();
    socket.auth={
      room:'123'
    }
    socketInstance.connect(); // Assuming socketInstance requires connect to be called
    return socketInstance;
  }, []);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('Socket message is', data);
    });

    return () => {
      socket.disconnect(); // Properly disconnect the socket
    };
  }, [socket]); // Add socket to the dependency array

  const handleClick = () => {
  //Providing custom messgae
    socket.emit('message', { name: 'TestName', id: uuidV4() });
  };

  return (
    <div>
      <button className='bg-purple-600 px-4 py-1 m-1 rounded-md text-white' onClick={handleClick}>
        Send Message
      </button>
    </div>
  );
}

export default ChatBase;




// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// // Initialize socket connection
// const socket = io('http://localhost:3000'); 

// function Chat() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
    
//     socket.on('message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

    
//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit('message', message);
//       setMessages((prevMessages) => [...prevMessages, message]);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Chat</h1>
//       <div className="w-1/2 p-4 bg-white shadow-md rounded">
//         <div className="mb-4">
//           {messages.map((msg, index) => (
//             <div key={index} className="bg-blue-100 p-2 my-2 rounded">
//               {msg}
//             </div>
//           ))}
//         </div>
//         <input
//           type="text"
//           className="border rounded w-full p-2 mb-2"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button
//           className="bg-purple-600 text-white px-4 py-2 rounded"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
