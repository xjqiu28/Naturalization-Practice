import Score from './score/Score.jsx';

import Questions from './questions/Questions.jsx';

import { useState } from 'react';

import './App.css';

function App() {

  const [score, setScore] = useState(0);
  return (
    <div>
      <Score score = {score}/>
      <Questions />
    </div>
  );
}

export default App;
