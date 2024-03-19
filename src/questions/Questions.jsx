import { useState } from 'react';
import data from '../../data.js';
import './questions.css';

function Questions() {
  const [count, setCount] = useState(0);
  const numbers = [];

  while (numbers.length < 10) {
    let random = Math.floor(Math.random() * data.questions.length - 1);
    if (!numbers.includes(random)) {
      numbers.push(random);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  return (
    <div className="question-box">
      {count < 10 ? (
        <div>
          <p>This is the current {numbers[count]} value</p>
          {data.questions[numbers[count]].question}{' '}
          <input
            type="text"
            name="answer-box"
            placeholder="Enter answer here"
          />
          <input onClick={onSubmit} type="submit" value="Submit" />
        </div>
      ) : (
        <p>You have finished the whole thing</p>
      )}
    </div>
  );
}

export default Questions;
