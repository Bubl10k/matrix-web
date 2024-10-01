import { Box, Button, Container, Typography } from '@mui/material'
import Header from './components/Header.jsx';
import './index.css'
import MySelect from './components/UI/MySelect.jsx';
import { useState } from 'react';
import EquationForm from './components/EquationForm.jsx';

export default function App() {
  const [numEquation, setNumEquation] = useState(2);
  const [matrix, setMatrix] = useState(Array(numEquation).fill(Array(numEquation + 1).fill(0)));
  const [vector, setVector] = useState(Array(numEquation).fill(0));

  const handleChange = (event) => {
    setNumEquation(event.target.value);

    setMatrix(Array(Number(event.target.value)).fill(Array(Number(event.target.value)).fill(0)));
  };

  const generateRandomMatrix = () => {
    const newMatrix = Array.from({ length: numEquation }, () => 
      Array.from({ length: numEquation + 1 }, () => Math.floor(Math.random() * 100))
    );

    setMatrix(newMatrix);
  };

  return (
    <Container maxWidth="xl">
        <Header />
        <Typography variant='h4' sx={{
            color:'white',
            textAlign:'center',
            marginTop:'40px'
            }}
        >
            It`s web application that calculate system of equations by the Gaussian method
        </Typography>
        <Box
          sx={{
            display: 'flex',
            marginTop: '50px',
          }}
        >
          <Typography
            sx={{
              color:'white',
              marginRight:'10px',
              fontSize: '19px'
            }}
          >
            Number of unknown values ​​in the system:
          </Typography>
          <MySelect
            text={'Numbers of equations'}
            value={numEquation}
            label={'Numbers of equations'}
            items={[
              {value: 2, text: '2'},
              {value: 3, text: '3'},
              {value: 4, text: '4'},
              {value: 5, text: '5'},
              {value: 6, text: '6'},
            ]}
            handleChange={handleChange}
          />
          <Button 
            variant="contained"
            sx={{
              marginLeft: '50px',
            }}
            onClick={() => {
              generateRandomMatrix();
              console.log(matrix);
            }}
          >
            Generate matrix
          </Button>
        </Box>
        <EquationForm 
          matrix={matrix}
          setMatrix={setMatrix}
          numEquation={numEquation}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            sx={{
              marginTop: '50px',
            }}
            onClick={() => {
              console.log(matrix);
            }}
          >
            Calculate
          </Button>
        </Box>
    </Container>
  )
}

