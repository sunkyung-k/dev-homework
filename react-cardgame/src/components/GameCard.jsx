function GameCard({ number, handleInput, userPickList, sum }) {
  return (
    <>
      <div className="card">
        <label htmlFor={`card${number}`}>{number}</label>
        <input
          type="checkbox"
          id={`card${number}`}
          name="card"
          value={number}
          checked={userPickList?.includes(number)}
          disabled={sum?.length > 0}
          onChange={handleInput}
        />
      </div>
    </>
  );
}

export default GameCard;
