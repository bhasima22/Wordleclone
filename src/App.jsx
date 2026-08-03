import { useEffect, useState } from "react";
import GameBoard from "./assets/Components/GameBoard";
import Keyboard from "./assets/Components/Keyboard";
import GameOverModal from "./assets/Components/GameOverModal";
import wordList from "./wordList";
import "./App.css";

function App() {
  // =========================
  // GAME STATE
  // =========================

 const [solutionWord, setSolutionWord] = useState("MANGO");

  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  // =========================
  // RESTART GAME
  // =========================

const restartGame = () => {
  setSolutionWord("MANGO");
  setCurrentGuess("");
  setPastGuesses([]);
  setEvaluations([]);
  setGameStatus("IN_PROGRESS");
};

  // =========================
  // SUBMIT GUESS
  // =========================

  const submitGuess = () => {
    if (currentGuess.length !== 5) {
      return;
    }

    const guess = currentGuess.toUpperCase();
    const solution = solutionWord.toUpperCase();

    // Check whether the word is in our word list
    if (!wordList.includes(guess)) {
      alert("Not a valid word!");
      return;
    }

    // Start all letters as absent
    const result = Array(5).fill("absent");

    // Keep track of unused solution letters
    const remainingLetters = solution.split("");

    // Check correct letters first
    for (let i = 0; i < 5; i++) {
      if (guess[i] === solution[i]) {
        result[i] = "correct";
        remainingLetters[i] = null;
      }
    }

    // Check letters in the wrong position
    for (let i = 0; i < 5; i++) {
      if (result[i] === "correct") {
        continue;
      }

      const letterIndex = remainingLetters.indexOf(guess[i]);

      if (letterIndex !== -1) {
        result[i] = "present";
        remainingLetters[letterIndex] = null;
      }
    }

    // Save guess and evaluation
    const newPastGuesses = [...pastGuesses, guess];
    const newEvaluations = [...evaluations, result];

    setPastGuesses(newPastGuesses);
    setEvaluations(newEvaluations);
    setCurrentGuess("");

    // WIN
    if (guess === solution) {
      setGameStatus("WON");
    }

    // LOSS
    else if (newPastGuesses.length === 6) {
      setGameStatus("LOST");
    }
  };

  // =========================
  // HANDLE KEYBOARD INPUT
  // =========================

  const handleKeyPress = (key) => {
    if (gameStatus !== "IN_PROGRESS") {
      return;
    }

    // Enter
    if (key === "ENTER") {
      submitGuess();
      return;
    }

    // Backspace
    if (key === "BACKSPACE") {
      setCurrentGuess((previous) => previous.slice(0, -1));
      return;
    }

    // A-Z letters
    if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((previous) => previous + key);
      }
    }
  };

  // =========================
  // PHYSICAL KEYBOARD
  // =========================

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();

      if (event.key === "Backspace") {
        handleKeyPress("BACKSPACE");
        return;
      }

      if (event.key === "Enter") {
        handleKeyPress("ENTER");
        return;
      }

      if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, gameStatus, pastGuesses, evaluations]);

  // =========================
  // KEYBOARD COLORS
  // =========================

  const keyStatuses = {};

  pastGuesses.forEach((guess, rowIndex) => {
    const result = evaluations[rowIndex];

    guess.split("").forEach((letter, index) => {
      const status = result[index];

      // Correct has highest priority
      if (status === "correct") {
        keyStatuses[letter] = "correct";
      }

      // Present has second priority
      else if (
        status === "present" &&
        keyStatuses[letter] !== "correct"
      ) {
        keyStatuses[letter] = "present";
      }

      // Absent has lowest priority
      else if (
        status === "absent" &&
        !keyStatuses[letter]
      ) {
        keyStatuses[letter] = "absent";
      }
    });
  });

  // =========================
  // DISPLAY
  // =========================

  return (
    <div className="app">
      <h1>WORDLE</h1>

      <GameBoard
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
        evaluations={evaluations}
      />

      <Keyboard
        onKeyPress={handleKeyPress}
        keyStatuses={keyStatuses}
      />

      <GameOverModal
        gameStatus={gameStatus}
        solutionWord={solutionWord}
        onRestart={restartGame}
      />
    </div>
  );
}

export default App;