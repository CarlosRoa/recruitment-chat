import { useState } from 'react';
import { Box, CircularProgress, TextField, Button, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ModalCandidate from './ModalCandidate';

const ChatContainer = styled(Box)({
  backgroundColor: '#282c34', 
  height: "100vh",
});

const MessagesContainer = styled(Box)({
  overflow: 'auto',
  height: "70vh",
});

const MessageInputContainer = styled(Box)({
  padding: '1rem',
  height: "15vh",
});

const HeaderContainer = styled(Box)({
    padding: '1rem',
    height: "10vh",
  });

const Message = styled(Box)({
    padding: '3rem',
    paddingBottom: '0.5rem',
    borderRadius: '5rem',
    maxWidth: '60%',
    width: 'fit-content',
    paddingTop: '0.5rem',
    });

function Chat() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([{text: 'Hola! Que perfil necesitas hoy?', sender: 'server'}]);
  const [loading, setLoading] = useState(false);
  const [threadID, setThreadID] = useState('');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    setLoading(true);
    fetch('http://localhost:3000/api/v1/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, threadID }),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setMessages([...messages, { text: message, sender: 'user' }, { text: data.summary, data: data?.data, sender: 'server' }]);
      setThreadID(data.threadID);
      setLoading(false);
    });
    setMessage('');
  };

  return (
    <ChatContainer>
        <HeaderContainer>
            <Typography variant="h4" gutterBottom> Proceso selección "DEV002" </Typography>
            <Divider sx={{ color: "white", bgcolor: "white"}} />
        </HeaderContainer>
      <MessagesContainer>
        {messages?.map((msg, index) => (
         <Box style={{padding: 5}}>
          <Message key={index} sx={{ bgcolor: msg.sender === 'user' ? 'primary.userMessage' : 'primary.serverMessage',  ml: msg.sender === 'user' ? 'auto' : 'none', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            {msg.text}
            {msg.sender === 'server' && <ModalCandidate data={msg.data} />}
          </Message>
         </Box>
        ))}
      </MessagesContainer>
      <MessageInputContainer>
        <TextField
          InputLabelProps={{ style: { color: 'white' } }}
          variant="outlined"
          sx={{ input: { color: 'white'} }} 
          label="Escribe un mensaje"
          value={message}
          onChange={handleMessageChange}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              handleSendMessage();
              ev.preventDefault();
            }
          }}
          fullWidth
          style={{ marginBottom: matches ? '1rem' : '0.5rem', color: 'white' }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Enviar'}
        </Button>
      </MessageInputContainer>
    </ChatContainer>
  );
}

export default Chat;
