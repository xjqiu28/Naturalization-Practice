import data from '../../data.js';
import './questions.css';

function Questions() {
    const random = Math.floor(Math.random() * data.questions.length-1);
    const numbers = [];
    let count = 0;

    while (numbers.length < 10){
        let random =  Math.floor(Math.random() * data.questions.length-1);
        if (!(numbers.includes(random))){
            numbers.push(random);
        }
        console.log(numbers);
    }
    
    
    
    return (
        <div className='question-box'>
        {data.questions[random].question}
        </div>
    )
}

export default Questions;