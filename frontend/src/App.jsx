import{BrowserRouter} from 'react-router-dom'

import Header from './components/Header.jsx';
import { Container } from '@mui/material';
import AppRouter from './components/AppRouter.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Header />
      </Container>
        <AppRouter />
    </BrowserRouter>
  );
}
