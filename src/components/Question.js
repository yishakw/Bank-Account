import Options from "./Options";

function Question({ question, dispatch, newAnswer }) {
  console.log(question);
  return (
    <div>
      <h2>{question.question}</h2>
      <Options question={question} dispatch={dispatch} newAnswer={newAnswer} />
    </div>
  );
}

export default Question;
