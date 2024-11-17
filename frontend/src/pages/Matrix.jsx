import { Box, Button, Container, TextField, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import '../index.css';
import { useContext, useRef, useState } from 'react';
import MySelect from '../components/UI/MySelect.jsx';
import EquationForm from '../components/EquationForm.jsx';
import { ApiService } from '../services/api.js';
import AuthContext from '../context/AuthProvider.jsx';

export default function Matrix() {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [numEquation, setNumEquation] = useState(2);
  const [matrix, setMatrix] = useState(Array(numEquation).fill(Array(numEquation).fill(0)));
  const [vector, setVector] = useState(Array(numEquation).fill(0));
  const [showMessage, setShowMessage] = useState(false); // State to control the Snackbar
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
    try {
      const apiService = new ApiService(authTokens);
      let taskId = await apiService.sendData(matrix, vector);
      console.log('Task ID:', taskId);
      setShowMessage(true); // Show the message when calculation is successful
    } catch (err) {
      console.error('Error calculating the system:', err);
    }
  };

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

  return (
    <Container maxWidth="xl">
      <Typography
        variant='h4'
        sx={{
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
        <Typography
          sx={{
            color:'white',
            marginLeft:'10px',
            marginRight:'10px',
            fontSize: '19px'
          }}
        >
          or select it manually
        </Typography>
        <TextField 
          sx={{
            width: '100px',
          }}
          variant="outlined"
          onChange={(e) => setNumEquation(e.target.value)}
        />
        <Button 
          variant="contained"
          sx={{
            marginLeft: '50px',
          }}
          onClick={() => {
            generateRandomSystem();
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
      {(numEquation >= 2 && numEquation <= 6) ? (
        <EquationForm
          matrix={matrix}
          setMatrix={setMatrix}
          numEquation={numEquation}
          vector={vector}
          setVector={setVector}
        />
      ) : null}
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
          onClick={handleCalculate}
        >
          Calculate
        </Button>
      </Box>
      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={() => setShowMessage(false)}
      >
        <MuiAlert
          onClose={() => setShowMessage(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Task added to history!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
