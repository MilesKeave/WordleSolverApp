import "bootswatch/dist/slate/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import './guess.css';

export default function Guess(guess, feedback2){
    console.log(guess.guess);
    
    
   
    const feedback = guess.feedback2
    



    



    return(
        
    <div className = "guess-row" >
        
            <div className = "box-item" style={{backgroundColor : feedback[0]}}>
                <h1 className= "letter-box">
                    {guess.guess[0]}
                </h1>
                {/* <div className="colorSelect">

                </div> */}
            </div>

            <div className = "box-item" style={{backgroundColor : feedback[1]}}>
                <p className= "letter-box">
                    {guess.guess[1]}
                </p>
            </div>
            <div className = "box-item" style={{backgroundColor : feedback[2]}}>
                <p className= "letter-box">
                    {guess.guess[2]}
                </p>
            </div>
            <div className = "box-item" style={{backgroundColor : feedback[3]}}>
                <p className= "letter-box">
                    {guess.guess[3]}
                </p>
            </div>
            <div className = "box-item" style={{backgroundColor : feedback[4]}}>
                <p className= "letter-box">
                    {guess.guess[4]}
                </p>
            </div>



        
    </div>
    )


}