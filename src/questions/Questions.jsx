import { useEffect, useState } from 'react';
import updatedData from '../../data.js';
import './questions.css';

function Questions(props) {
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const { incrementScore, score } = props;


  useEffect(() => {
    const generateNumbers = () => {
      const numbersGenerated = [];
      while (numbersGenerated.length < 10){
        let random = Math.floor(Math.random() * updatedData.questions.length-1);
        if (!numbersGenerated.includes(random)){
          numbersGenerated.push(random);
        }
      }
      setNumbers(numbersGenerated);
    };

    generateNumbers();
  }, [])


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(numbers)
    const answer = e.target.answer.value;
    const answers = updatedData.questions[numbers[count]].answers;
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
      {numbers.length > 0 && count < 10 ? (
        <div>
          {updatedData.questions[numbers[count]].question}{' '}
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
