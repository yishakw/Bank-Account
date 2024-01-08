function Options({ question, dispatch, newAnswer }) {
  //   console.log(question.correctOption);
  const answerStatus = newAnswer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${newAnswer === index ? "answer" : ""} ${
            answerStatus &&
            (index === question.correctOption ? "correct" : "wrong")
          } `}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answerStatus}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
