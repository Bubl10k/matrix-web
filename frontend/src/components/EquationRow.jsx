import { Box, TextField, Typography } from "@mui/material"

export default function EquationRow({ row, rowIndex, numEquation, setMatrix, matrix }) {
    const handleChange = (event, colIndex) => {
        const value = event.target.value;
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = value;
        setMatrix(newMatrix);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                marginTop: '20px',
            }}
        >
            {matrix[rowIndex].slice(0, numEquation).map((_, index) => {
                return (
                    <Box key={index} sx={{ display: 'flex' }}>
                        <TextField
                            sx={{ 
                                width: '80px',
                                marginRight: '20px',
                                marginLeft: '20px',
                            }}
                            variant='outlined'
                            label={'x' + (index + 1)}
                            onChange={(event) => handleChange(event, index)}
                            value={row[index]}
                        />
                        {index < numEquation - 1 && (
                            <Typography sx={{ color: 'white'}}>+</Typography>
                        )}
                    </Box>
                )
            })}
            <Typography
                sx={{
                    color: 'white'
                }}
            >
                =
            </Typography>
            <TextField
                sx={{ 
                    width: '80px',
                    marginRight: '20px',
                    marginLeft: '20px',
                }}
                variant='outlined'
                label={'result'}
                value={row[numEquation]}
                onChange={(event) => handleChange(event, numEquation)}
            />
        </Box>
    )
}