import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={darkTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
)
