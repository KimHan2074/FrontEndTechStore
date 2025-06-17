// import React, { useState } from 'react';
// import axios from 'axios';
// import './Chatbox.css';

// const Chatbox = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const [isChatOpen, setIsChatOpen] = useState(false);

//     const toggleChat = () => {
//         setIsChatOpen(!isChatOpen);
//     };

//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         const userMessage = { sender: 'user', text: input };
//         setMessages((prev) => [...prev, userMessage]);

//         try {
//             const response = await axios.post('http://localhost:8000/api/chat', {
//                 message: input,
//             });

//             const aiMessage = { sender: 'ai', text: response.data.reply };
//             setMessages((prev) => [...prev, aiMessage]);
//         } catch (error) {
//             const errorMessage = { sender: 'ai', text: 'Error connecting to the server.' };
//             setMessages((prev) => [...prev, errorMessage]);
//         }

//         setInput('');
//     };

//     return (
//         <div>
//             <button className="chat-toggle" onClick={toggleChat}>
//                 💬
//             </button>

//             {isChatOpen && (
//                 <div className="chatbox-large">
//                     <div className="chat-header">
//                         <h3>Chat Assistant</h3>
//                         <button onClick={toggleChat} className="close-chat">
//                             ✖
//                         </button>
//                     </div>
//                     <div className="messages">
//                         {messages.map((msg, index) => (
//                             <div key={index} className={`message ${msg.sender}`}>
//                                 {msg.text}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="input-area">
//                         <input
//                             type="text"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="Type your message..."
//                         />
//                         <button onClick={sendMessage}>Send</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Chatbox;
