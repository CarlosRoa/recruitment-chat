import React from 'react';
import { Box, List, ListItem, Divider, Typography } from '@mui/material';
import Chat from './Chat';
import ChatHistory from './History';

const ChatLayout = () => {
  return (
    <Box display="flex" height="100vh" width="100vw" >
      <Box height="100vh" p={1} borderRight={1} borderColor="divider" width="20vw">
        <ChatHistory />
      </Box>
      <Box height="100vh" p={1} width="80vw">
        <Chat />
      </Box>
    </Box>
  );
};

export default ChatLayout;
