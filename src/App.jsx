import Score from './score/Score.jsx';

import Questions from './questions/Questions.jsx';

import { useState } from 'react';

import './App.css';

function App() {

  const incrementScore = () => {
    setScore(score + 1);
  }
  const [score, setScore] = useState(0);
  return (
    <div className="card">
      <div className="container">
        <Score score={score} />
        <Questions increment={incrementScore}/>
      </div>
    </div>
  );
}

export default App;
