import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [possibleWords, setPossibleWords] = useState([])
  const[guess, setGuess] = useState(" ")
  const [feedback, setFeedback] = useState(" ")

 

  const handleSubmit  = async(e) =>{
    e.preventDefault()
    
    
    try{
     
      
      await fetch('http://localhost:8000/route', {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({
          returnWords: possibleWords,
          feedback: feedback,
          guess: guess
        }),
        
      }).then(response => 
      
      response.json()
     
      ).then(data => {
        /* console.log("data")
        console.log(data) */
        
        setPossibleWords(data)})

    }
  
  catch (error){
    console.log("error Here", error)
  }
}

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={handleSubmit}>
          <label>
            Guess:
            <input
            type="text"
            name = "guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          </label>
          <label>
            Feedback
            <input
            type="text"
            name = "feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          </label>
          <button type="submit">Submit</button>
          
        </form>
        <div>
        <h2>Possible Words</h2>
        <ul>
          {possibleWords.map((word) => (
            <li>{word}</li>
          ))}
        </ul> 
      </div>
      </header>

        
  
    </div>
  );
          }


export default App;

