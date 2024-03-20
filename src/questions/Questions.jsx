import { useEffect, useState } from 'react';
import updatedData from '../../data.js';
import './questions.css';

function Questions(props) {
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const { incrementScore, score } = props;

  useEffect(() => {
    const generateNumbers = () => {
      const numbersGenerated = [];
      while (numbersGenerated.length < 10) {
        let random = Math.floor(Math.random() * updatedData.questions.length);
        if (!numbersGenerated.includes(random)) {
          numbersGenerated.push(random);
        }
      }
      setNumbers(numbersGenerated);
    };

    generateNumbers();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(numbers);
    const answer = e.target.answer.value;
    const answers = updatedData.questions[numbers[count]].answers;
    const question = updatedData.questions[numbers[count]];
    console.log(answers);
    if (answer === '') {
      setWrongQuestions([...wrongQuestions, question]);
      setCount(count + 1);
    } else {
      if (typeof answers === 'object') {
        answers.forEach((ans, index) => {
          ans = ans.toLowerCase();
          if (ans.includes(answer)) {
            setCorrectQuestions([...correctQuestions, question]);
            incrementScore();
          } else {
            setWrongQuestions([...wrongQuestions, question]);
          }
        });
      } else {
        console.log('Inside else statement: ', answers);
        if (answers.toLowerCase().includes(answer)) {
          setCorrectQuestions([...correctQuestions, question]);
          incrementScore();
        } else {
          setWrongQuestions([...wrongQuestions, question]);
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
            <div className="question-box">
              <p>You have failed the test 😞😞</p>
              <p>Questions you got right:</p>
              <ul>
                {correctQuestions.map((question, index) => (
                  <>
                    <li className="question" key={index}>
                      {question.question}
                    </li>
                    <li className="answer" key={index}>
                      {question.answers}
                    </li>
                    <hr className="horizontal-line"></hr>
                  </>
                ))}
              </ul>
              <p>Questions you got wrong:</p>
              <ul>
                {wrongQuestions.map((question, index) => (
                  <>
                    <li className="question" key={index}>
                      {question.question}
                    </li>
                    <li className="answer" key={index}>
                      {question.answers}
                    </li>
                    <hr className="horizontal-line"></hr>
                  </>
                ))}
              </ul>
              <a href="/">Reset</a>
            </div>
          ) : (
            <div className="question-box">
              <p>You have passed the test with {score}/10</p>
              <p>Questions you got right:</p>
              <ul>
                {correctQuestions.map((question, index) => (
                  <>
                    <li className="question" key={index}>
                      {question.question}
                    </li>
                    <li className="answer" key={index}>
                      {question.answers}
                    </li>
                    <hr className="horizontal-line"></hr>
                  </>
                ))}
              </ul>
              <p>Questions you got wrong:</p>
              <ul>
                {wrongQuestions.map((question, index) => (
                  <li key={index}>{question.question}</li>
                ))}
              </ul>
              <a href="/">Reset</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Questions;
