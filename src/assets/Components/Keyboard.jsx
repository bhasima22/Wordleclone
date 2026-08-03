const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function Keyboard({ onKeyPress, keyStatuses }) {
  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => (
            <button
              key={key}
              className={`key ${keyStatuses[key] || ""}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}

      <div className="keyboard-row">
        <button
          className="key wide-key"
          onClick={() => onKeyPress("ENTER")}
        >
          ENTER
        </button>

        <button
          className="key wide-key"
          onClick={() => onKeyPress("BACKSPACE")}
        >
          ⌫
        </button>
      </div>
    </div>
  );
}

export default Keyboard;