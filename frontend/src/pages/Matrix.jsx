import { Box, Button, Container, Typography } from '@mui/material'
import '../index.css';
import { useState } from 'react';
import MySelect from '../components/UI/MySelect.jsx';
import EquationForm from '../components/EquationForm.jsx';

export default function Matrix() {
  const [numEquation, setNumEquation] = useState(2);
  const [matrix, setMatrix] = useState(Array(numEquation).fill(Array(numEquation).fill(0)));
  const [vector, setVector] = useState(Array(numEquation).fill(0));

  const handleChange = (event) => {
    setNumEquation(event.target.value);

    setMatrix(Array(Number(event.target.value)).fill(Array(Number(event.target.value)).fill(0)));
    setVector(Array(Number(event.target.value)).fill(0));
  };

  const generateRandomSystem = () => {
    const newMatrix = Array.from({ length: numEquation }, () => 
      Array.from({ length: numEquation + 1 }, () => Math.floor(Math.random() * 100))
    );
    const newVector = Array.from({ length: numEquation }, () => Math.floor(Math.random() * 100));
    setMatrix(newMatrix);
    setVector(newVector);
  };

  return (
    <Container maxWidth="xl">
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
            Number of unknown values in the system:
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
              generateRandomSystem();
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
          vector={vector}
          setVector={setVector}
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
              console.log(vector);
            }}
          >
            Calculate
          </Button>
        </Box>
    </Container>
  )
}
