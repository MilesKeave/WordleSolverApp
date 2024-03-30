import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/slate/bootstrap.min.css'; 
import logoImage from './wordle-logo-BFA5E0DEB0-seeklogo.com.png';

import { Button} from 'react-bootstrap';
import './App.css';
import React, {useState, useEffect} from 'react';
import Guess from "./guess.js";
import {LETTERS} from "./data/letters.js"

function App() { 

  const [possibleWords, setPossibleWords] = useState([])
  const [guess, setGuess] = useState("")
  const [feedback, setFeedback] = useState(["w","w","w","w","w"])
  const [guessSoFar, setGuessSoFar] = useState(0)
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
        
        setPossibleWords(data)
        setGuess("")
        setFeedback(["w","w","w","w","w"])
        setGuessSoFar(guessSoFar + 1)
      })

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
       
        <img src={logoImage} />

        <form>
          <Guess guess = {guess.toUpperCase()} feedback2={colors} />

          <div className = "guess-row2">
            <div className = "colorSelector"> 
              <Button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(0, "w")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(0, "y")}} > </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(0, "g")}}> </Button>
            </div>
            <div className = "colorSelector"> 
              <Button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(1, "w")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(1, "y")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(1, "g")}} > </Button>
            </div>
            <div className = "colorSelector">
              <Button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(2, "w")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(2, "y")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(2, "g")}}> </Button>
            </div>
            <div className = "colorSelector">
              <Button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(3, "w")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(3, "y")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(3, "g")}}> </Button>
            </div>
            <div className = "colorSelector">
              <Button className = "colorSelector" style={{backgroundColor : "black"}} type = "button" onClick={()=>{setIthFeedback(4, "w")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#c8b653"}} type = "button" onClick={()=>{setIthFeedback(4, "y")}}> </Button>
              <Button className = "colorSelector" style={{backgroundColor : "#6ca965"}} type = "button" onClick={()=>{setIthFeedback(4, "g")}}> </Button>
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
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
          
        </form>
        <div>
        <h2 className ="wordTitle"> Guesses so Far: {guessSoFar} </h2>
        <h2 className ="wordTitle">Possible Words</h2>
        <ul className = "wordList">
        {possibleWords.length === 0 ? (
          <li>{"There are no possible words with this combination"}</li>
           ) : (
          possibleWords.map((word) => <li>{word}</li>)
          )}
        </ul> 
      </div>
      </header>

        
  
    </div>
  );
          }


export default App;

