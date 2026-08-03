import Tile from "./Tile.jsx";

function Row({ guess, evaluation }) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    tiles.push(
      <Tile
        key={i}
        letter={guess[i] || ""}
        status={evaluation[i] || ""}
      />
    );
  }

  return <div className="row">{tiles}</div>;
}

export default Row;