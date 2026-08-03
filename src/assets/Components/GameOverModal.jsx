function GameOverModal({
  gameStatus,
  solutionWord,
  onRestart,
}) {
  // Don't show the modal while the game is running
  if (gameStatus === "IN_PROGRESS") {
    return null;
  }

  const playerWon = gameStatus === "WON";

  return (
    <div className="modal-overlay">
      <div className="game-over-modal">
        {playerWon ? (
          <>
            <h2>You Won! </h2>

            <p>Congratulations!</p>

            <p>The correct word was:</p>

            <strong>{solutionWord}</strong>
          </>
        ) : (
          <>
            <h2>Game Over!</h2>

            <p>The correct word was:</p>

            <strong>{solutionWord}</strong>
          </>
        )}

        <button onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOverModal;