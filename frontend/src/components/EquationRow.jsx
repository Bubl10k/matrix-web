import { Box, TextField, Typography } from "@mui/material";

export default function EquationRow({
  row,
  rowIndex,
  numEquation,
  setMatrix,
  matrix,
  vector,
  setVector
}) {
  const handleChangeMatrix = (event, colIndex) => {
    const value = event.target.value;
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = value;
    setMatrix(newMatrix);
  };

  const handleChangeVector = (event) => {
    const value = event.target.value;
    const newVector = [...vector];
    newVector[rowIndex] = value;
    setVector(newVector);
  }

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "20px",
      }}
    >
      {matrix[rowIndex].slice(0, numEquation).map((_, index) => {
        return (
          <Box key={index} sx={{ display: "flex" }}>
            <TextField
              sx={{
                width: "80px",
                marginRight: "20px",
                marginLeft: "20px",
              }}
              variant="outlined"
              label={"x" + (index + 1)}
              onChange={(event) => handleChangeMatrix(event, index)}
              value={row[index]}
            />
            {index < numEquation - 1 && (
              <Typography sx={{ color: "white" }}>+</Typography>
            )}
          </Box>
        );
      })}
      <Typography
        sx={{
          color: "white",
        }}
      >
        =
      </Typography>
      <TextField
        sx={{
          width: "80px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
        variant="outlined"
        label={"result"}
        value={vector[rowIndex]}
        onChange={(event) => handleChangeVector(event)}
      />
    </Box>
  );
}
