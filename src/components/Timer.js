import { useEffect } from "react";

function Timer({ dispatch, timeRemaining }) {
  const interval = 1000;
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  console.log(mins, secs);
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timer" });
      }, interval);
      return () => {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins}:{secs}
    </div>
  );
}

export default Timer;
