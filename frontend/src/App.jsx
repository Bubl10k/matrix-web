import{BrowserRouter} from 'react-router-dom'

import Header from './components/Header.jsx';
import { Container } from '@mui/material';
import AppRouter from './components/AppRouter.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

export default function App() {
  return (
    <Container maxWidth="xl">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </Container>
  );
}
