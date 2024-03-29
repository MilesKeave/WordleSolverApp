import "bootswatch/dist/slate/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import './guess.css';

export default function Guess(guess){
    console.log(guess.guess);

    



    return(
        
    <div className = "guess-row">
        
            <div className = "box-item">
                <h1 className= "letter-box">
                    {guess.guess[0]}
                </h1>
            </div>
            <div className = "box-item">
                <p className= "letter-box">
                    {guess.guess[1]}
                </p>
            </div>
            <div className = "box-item">
                <p className= "letter-box">
                    {guess.guess[2]}
                </p>
            </div>
            <div className = "box-item">
                <p className= "letter-box">
                    {guess.guess[3]}
                </p>
            </div>
            <div className = "box-item">
                <p className= "letter-box">
                    {guess.guess[4]}
                </p>
            </div>



        
    </div>
    )


}