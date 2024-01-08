function NextButton({ newAnswer, dispatch, index, numQestions }) {
  //   console.log(numQestions);
  if (newAnswer === null) return;
  if (index + 1 === numQestions) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        finish
      </button>
    );
  }
  if (numQestions > index + 1) {
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        Next
      </button>
    );
  }
}

export default NextButton;
