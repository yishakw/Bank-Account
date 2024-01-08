import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
  questions: [],
  //"loading", "error", "active", "ready", "finished"
  status: "loading",
  index: 0,
  newAnswer: null,
  points: 0,
  highScore: 0,
  timeRemaining: 100,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * 30,
      };
    case "newAnswer":
      const quest = state.questions.at(state.index);
      const pt = quest.correctOption === action.payload ? 10 : 0;
      return { ...state, newAnswer: action.payload, points: state.points + pt };
    case "next":
      return { ...state, index: state.index + 1, newAnswer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "reset":
      return { ...initialState, status: "ready", questions: state.questions };
    case "timer":
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    default:
      throw new Error("Action incorrect");
  }
}
function App() {
  const [
    { questions, status, index, newAnswer, points, highScore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  console.log(questions.length);
  useEffect(function () {
    async function fetchFromServer() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataRecived", payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchFromServer();
  }, []);
  // dispatch({ type: "finished" });
  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              points={points}
              numPoints={numPoints}
              numQuestions={questions.length}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              newAnswer={newAnswer}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
              <NextButton
                newAnswer={newAnswer}
                dispatch={dispatch}
                index={index}
                numQestions={questions.length}
                numPoints={numPoints}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            numQuestions={questions.length}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
