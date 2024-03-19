import { useState } from 'react';
import data from '../../data.js';
import './questions.css';

function Questions(props) {
  const [count, setCount] = useState(0);
  const numbers = [];
  const { incrementScore, score } = props;

  while (numbers.length < 10) {
    let random = Math.floor(Math.random() * data.questions.length - 1);
    if (!numbers.includes(random)) {
      numbers.push(random);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(numbers)
    const answer = e.target.answer.value;
    const answers = data.questions[numbers[count]].answers;
    console.log(answers);
    if (answer === '') {
      setCount(count + 1);
    } else {
      if (typeof answers === 'object') {
        answers.forEach((ans, index) => {
          ans = ans.toLowerCase();
          if (ans.includes(answer)) {
            incrementScore();
          }
        });
      } else {
        console.log('Inside else statement: ', answers);
        if (answers.toLowerCase().includes(answer)) {
          incrementScore();
        }
      }
    }
    setCount(count + 1);
    e.target.reset();
  };

  return (
    <div className="question-box">
      {count < 10 ? (
        <div>
          <p>This is the current {numbers[count]} value</p>
          {data.questions[numbers[count]].question}{' '}
          <form onSubmit={onSubmit} autoComplete="off">
            <input type="text" name="answer" placeholder="Enter answer here" />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <>
          {score < 6 ? (
            <p>You have failed the test 😞😞</p>
          ) : (
            <p>You have passed the test with {score}/10</p>
          )}
        </>
      )}
    </div>
  );
}

export default Questions;
