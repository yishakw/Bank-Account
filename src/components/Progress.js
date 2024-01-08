function Progress({ index, points, numPoints, numQuestions }) {
  return (
    <header className="progress">
      {/* <input type="progrss" min={0} max={15} /> */}
      <progress value={index} max={15}></progress>

      <p>
        Question {index + 1}/{numQuestions}
      </p>
      <p>
        {points}/{numPoints}points
      </p>
    </header>
  );
}

export default Progress;
