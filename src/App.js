import logo from './logo.svg';
import "bootswatch/dist/slate/bootstrap.min.css";
import './App.css';
import React, {useState, useEffect} from 'react';
import Guess from "./guess.js";
import {LETTERS} from "./data/letters.js"

function App() {

  const [possibleWords, setPossibleWords] = useState([])
  const[guess, setGuess] = useState("")
  const [feedback, setFeedback] = useState("")
  const [guessSoFar, setGuessSoFar] = useState("")

  const typeLetter = (letter) =>{

    //Todo
    console.log(letter)
  }


  const handleKeyDown = (event) =>{
    //console.log("ketodwn")

    /* if (solutionFound) {
      return console.log("done");
    } */
    if (LETTERS.includes(event.key)){
      if (guess.length <5){
        setGuess(guess + event.key)
        console.log("set")
        console.log(guess + event.key)
        console.log("guess:" + guess)
      }

      //typeLetter(event.key)
    }
    if (event.keyCode === 8) {
      let length = guess.length - 1
      setGuess(guess.slice(0,length))
      console.log("delete")
      console.log(guess)
    }
    
  }
 

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
      <header className="App-header" tabIndex="0" onKeyDown={handleKeyDown}>
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={handleSubmit}>
          <Guess guess = {guess}/>
      
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

