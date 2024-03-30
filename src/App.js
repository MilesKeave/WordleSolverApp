import logo from './logo.svg';
import "bootswatch/dist/slate/bootstrap.min.css";
import './App.css';
import React, {useState, useEffect} from 'react';
import Guess from "./guess.js";
import {LETTERS} from "./data/letters.js"

function App() {

  const [possibleWords, setPossibleWords] = useState([])
  const [guess, setGuess] = useState("")
  const [feedback, setFeedback] = useState(["w","w","w","w","w"])
  const [guessSoFar, setGuessSoFar] = useState("")
  const [colors, setColors] = useState(["black", "black", "black", "black", "black"])


  const getColors = (feed) => {
    var dict = {
      "w": "#000000",
      "y": "#c8b653",
      "g":"#6ca965"
      
    };

    var i = 0
    var colorFeedback = []

    while (i<5){
      colorFeedback.push(dict[feed[i]])
      i+=1
    }
    console.log(colorFeedback)
    setColors(colorFeedback)



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
    console.log("here")
    console.log(feedback)
    console.log(guess)
    
    
    
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
          feedback: feedback.join(""),
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

useEffect(() => {
  getColors(feedback);


}, [feedback]);

const setIthFeedback = (i, letter) =>{
  var temp = feedback
  temp[i] = letter
  console.log(temp)
  console.log(feedback)
  setFeedback(temp)
  getColors(feedback)


}






  return (
    <div className="App">
      <header className="App-header" tabIndex="0" onKeyDown={handleKeyDown}>
        <img src={logo} className="App-logo" alt="logo" />

        <form>
          <Guess guess = {guess} feedback2={colors} />

          <div className = "guess-row2">
            <div className = "colorSelector"> 
              <button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(0, "w")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(0, "y")}} > </button>
              <button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(0, "g")}}> </button>
            </div>
            <div className = "colorSelector"> 
              <button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(1, "w")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(1, "y")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(1, "g")}} > </button>
            </div>
            <div className = "colorSelector">
              <button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(2, "w")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(2, "y")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(2, "g")}}> </button>
            </div>
            <div className = "colorSelector">
              <button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(3, "w")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(3, "y")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(3, "g")}}> </button>
            </div>
            <div className = "colorSelector">
              <button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(4, "w")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(4, "y")}}> </button>
              <button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(4, "g")}}> </button>
            </div>
          </div>

          
      
         {/*  <label>
            Feedback
            <input
            type="text"
            name = "feedback"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value)
              }}
          />
          </label> */}
          <button type="submit" onClick={handleSubmit}>Submit</button>
          
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

