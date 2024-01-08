import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChatLayout from './Components/Layout';
import { AuthProvider } from './Components/Auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      userMessage: '#094236',
      serverMessage: '#2b4284',
      modalCandidateBackground: '#282c34',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path='/chat' element={<ChatLayout />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

