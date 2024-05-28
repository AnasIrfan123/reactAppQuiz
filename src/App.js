import './App.css';
import Assets from '../src/Assets/d73449313ecedb997822efecd1ee3eac.gif'  
import { useEffect, useState } from 'react';

function App() {

  const [qustion, setQustion] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [result, setResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
  const [score, setScore] = useState(0)

  useEffect(() => {
    getData()
  }, [])

  function getData() {
    fetch('https://the-trivia-api.com/v2/questions')
    .then(res => res.json())
    .then(res => {
      console.log(res);
      
      res.map(function (items){
        items.options = [items.correctAnswer, ...items.incorrectAnswers]
        items.options = shuffle(items.options)
      })
      
      setQustion(res)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
  }

  function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//qustion == ''   or   qustion == 0   or   !qustion.length  3no loader ki condit ha 1 he km ha 3no ka
  if (!qustion.length) { 
    return <div className='imgLoader'>
      <img src={Assets} />
    </div>
  }

  function next() {
  
    if (selectedOption === currentQuestion.correctAnswer){
      setScore(score + 1);
    }

    if (currentIndex === qustion.length -1) {
      setResult(true)
    
    } else {
      setCurrentIndex(currentIndex + 1)
    }

    setSelectedOption(null) // Reset selected option when moving to the next question
  }

  function restart() {
    setCurrentIndex(0)
    setResult(false) //restart button click par result false ho jaye
   
    setScore(0)
  }

  const currentQuestion = qustion[currentIndex]

  return (
    <div className="App">
      <div className='title'>Quiz App</div>

      <div className="categorize">
        <p className='category'>Category: {currentQuestion.category}</p>
        <p className='difficult'>Difficulty: {currentQuestion.difficulty}</p>
      </div>

  { !result ? (
    <div>

      <h4 className='qustion'>{currentIndex + 1}) {currentQuestion.question.text}</h4>

      {currentQuestion.options.map(function (item) {
        return (<div key={item} className='options' > 
          <input type="radio" value={item} name='options' 
          onClick={() => setSelectedOption(item)} // Update selected option
          checked={selectedOption === item} // Check if the option is selected
          />
          {item}
        </div>)
      })}

      <button onClick={next} className='nextBtn' disabled={!selectedOption}>Next</button> {/* Disable the Next button if no option is selected */}
    </div>
   ) : (
    <div>
      <h2 className='result'>Result</h2>

        <p className='scoreText'>{'Quiz is ended .. your Score is '}<span className='score'>{ (score * 100) / qustion.length }</span>{'%'}</p>

      <button onClick={restart} className='RstartBtn'>Restart</button>
    </div> 
    )}

    </div>
  );
}

export default App;




//  ------------  javascript shuffle option code => stack over flow web   --------------------

// function shuffle(array) {
//   let currentIndex = array.length,  randomIndex;

//   // While there remain elements to shuffle.
//   while (currentIndex > 0) {

//     // Pick a remaining element.
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex], array[currentIndex]];
//   }

//   return array;
// }


// ------------------------------------------------------------------------------

