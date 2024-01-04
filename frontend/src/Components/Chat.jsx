import { useState } from 'react';
import '../Chat.css'; // Importa los estilos CSS

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    fetch('/api/v1/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
}

export default Chat;

