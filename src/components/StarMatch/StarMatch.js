import React, { useEffect, useState } from 'react';
import { NumberButton } from '../NumberButton/NumberButton';
import { StarsDisplay } from '../StarsDIsplay/StarsDisplay';
import { PlayAgain } from '../PlayAgain/PlayAgain';
import './StarMatch.css';

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    //Make sure to have the minimum neccesary containers to represent the states
    const [ availableNums, setAvailableNums ] = useState(utils.range(1, 9));
    const [ candidateNums, setCandidateNums ] = useState([]);
    const [ secondsLeft, setSecondsLeft] = useState(10);

    //Run this function every time the owner component renders itself
    useEffect(() => {
      //Since the setTimeout function affects the state, React will rerender after every time we call it, so it will continue to call the same function every second in a loop
      if (secondsLeft > 0 && availableNums.length > 0) {
        const timerId = setTimeout(() => {
          setSecondsLeft(secondsLeft - 1);
        } ,1000);

        //Cleaning up after the effect
        return () => clearTimeout(timerId);
      }
    });

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0
      ? 'won'
      : secondsLeft === 0 ? 'lost' : 'active';

    const resetGame = () => {
      setStars(utils.random(1, 9));
      setAvailableNums(utils.range(1, 9));
      setCandidateNums([]);
      setSecondsLeft(10);
    }

    const numberStatus = (number) => {
      if (!availableNums.includes(number)) {
        return 'used';
      }

      if(candidateNums.includes(number)) {
        return candidatesAreWrong ? 'wrong' : 'candidate';
      }

      return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
      //currentStatus => newStatus
      if (gameStatus !== 'active' || currentStatus === 'used') {
        return;
      }

      const newCandidateNums =
        currentStatus === 'available' 
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);
      if (utils.sum(newCandidateNums) !== stars) {
        setCandidateNums(newCandidateNums);
      } else {
        const newAvailableNums = availableNums.filter(num => !newCandidateNums.includes(num));
        setStars(utils.randomSumIn(newAvailableNums, 9));
        setAvailableNums(newAvailableNums);
        setCandidateNums([]);
      }
    }

    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            { gameStatus !== 'active' ? (
              <PlayAgain onClick={resetGame} gameStatus={gameStatus}/>
            ) : (
              <StarsDisplay count={stars}/>
            )}
          </div>
          <div className="right">
            { utils.range(1, 9).map(number =>
              <NumberButton 
                key={number} 
                number={number} 
                status={numberStatus(number)}
                onClick={onNumberClick}
              />
            )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };
  
  // Color Theme
  const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
  
  // Math science
  const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
  
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  
    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
  
    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
  };

  export {
    StarMatch,
    utils,
    colors
  };