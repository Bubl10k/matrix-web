import { Box, Button, Container, LinearProgress, Typography } from '@mui/material'
import '../index.css';
import { useRef, useState } from 'react';
import MySelect from '../components/UI/MySelect.jsx';
import EquationForm from '../components/EquationForm.jsx';
import { sendDataToBackend } from '../services/api.js';
import ResultModal from '../components/ResultModal.jsx';

export default function Matrix() {
  const [numEquation, setNumEquation] = useState(2);
  const [matrix, setMatrix] = useState(Array(numEquation).fill(Array(numEquation).fill(0)));
  const [vector, setVector] = useState(Array(numEquation).fill(0));
  const [result, setResult] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    setNumEquation(event.target.value);

    setMatrix(Array(Number(event.target.value)).fill(Array(Number(event.target.value)).fill(0)));
    setVector(Array(Number(event.target.value)).fill(0));
  };

  const generateRandomSystem = () => {
    const newMatrix = Array.from({ length: numEquation }, () => 
      Array.from({ length: numEquation }, () => Math.floor(Math.random() * 100))
    );
    const newVector = Array.from({ length: numEquation }, () => Math.floor(Math.random() * 100));
    setMatrix(newMatrix);
    setVector(newVector);
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await sendDataToBackend(matrix, vector, setProgress);
      setResult(response.data.result);
      setOpen(true);
    } catch (err) {
      console.error('Error sending matrix to backend:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.matrix && data.vector) {
          setMatrix(data.matrix);
          setVector(data.vector);
        } else {
          console.error("Invalid file format");
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleClose = () => {
    setOpen(false);
  }

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
          <Button 
            variant="contained"
            sx={{
              marginLeft: '50px',
            }}
            onClick={() => fileInputRef.current.click()}
          >
            Upload matrix from file
          </Button>
          <input
            type='file'
            accept='.json'
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </Box>
        {loading && <LinearProgress variant="determinate" value={progress} sx={{ marginTop: '20px' }} />}
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
            disabled={loading}
            onClick={handleCalculate}
          >
            Calculate
          </Button>
        </Box>
        <ResultModal
          result={result}
          open={open}
          handleClose={handleClose}
        />
    </Container>
  )
}
