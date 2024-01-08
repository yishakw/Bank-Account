function FinishScreen({
  points,
  numQuestions,
  numPoints,
  dispatch,
  highScore,
}) {
  const percent = (points / numPoints) * 100;
  console.log(percent);
  return (
    <>
      <div className="result">
        <p>
          You scored {points} out of {numQuestions} questions({percent}%)
        </p>
      </div>
      <p className="highscore">Highscore : {highScore}</p>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="btn btn-ui"
      >
        Reset
      </button>
    </>
  );
}

export default FinishScreen;
