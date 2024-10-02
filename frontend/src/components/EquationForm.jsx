import EquationRow from "./EquationRow";

export default function EquationForm({
  numEquation,
  matrix,
  setMatrix,
  vector,
  setVector,
}) {
  return (
    <>
      {matrix.map((row, rowIndex) => {
        return (
          <EquationRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            numEquation={numEquation}
            setMatrix={setMatrix}
            matrix={matrix}
            vector={vector}
            setVector={setVector}
          />
        );
      })}
    </>
  );
}
