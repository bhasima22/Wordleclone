import Row from "./Row";

function GameBoard({ currentGuess, pastGuesses, evaluations }) {
  const rows = [];

  // Create exactly 6 rows
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    // Completed guess
    if (rowIndex < pastGuesses.length) {
      rows.push(
        <Row
          key={rowIndex}
          guess={pastGuesses[rowIndex]}
          evaluation={evaluations[rowIndex]}
        />
      );
    }

    // Current active guess
    else if (rowIndex === pastGuesses.length) {
      rows.push(
        <Row
          key={rowIndex}
          guess={currentGuess}
          evaluation={[]}
        />
      );
    }

    // Empty row
    else {
      rows.push(
        <Row
          key={rowIndex}
          guess=""
          evaluation={[]}
        />
      );
    }
  }

  return <div className="game-board">{rows}</div>;
}

export default GameBoard;