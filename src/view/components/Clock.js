// module: Clock.js
// author: Ben Riegel
// overview: defines and exports the Clock component, which keeps track of the
// timing of the game


//----- imports ----------------------------------------------------------------

import { useEffect, useRef, useState } from 'react';
import { convertTo3Digit } from '../../utils/utils.js';
import '../stylesheets/Clock.css';


//----- export code block ------------------------------------------------------

export default function Clock(props){

  //----- local functions -----

  function increment(){
    setDuration(prevValue => prevValue + 1);
  }

  function start(){
    if (interval.current === null){
      interval.current = setInterval(increment, 1000);
    }
  }

  function stop(){
    if (interval.current !== null){
      clearInterval(interval.current);
      interval.current = null;
    }
  }

  function reset(){
    stop();
    setDuration(0);
    start();
  }

  //----- state vars -----

  const [duration, setDuration] = useState(0);
  let interval = useRef(null);

  //----- effects -----

  //specifies the functions to call when the component mounts and unmounts
  useEffect( ()=>{
    start();
    return stop;
  }, []);

  //checks a change in the gameOver prop; if the game is over, then the timer
  //is stopped
  useEffect( ()=>{
    if (props.gameOver){
      stop();
    }
  }, [props.gameOver]);

  //if the field array changes, then this means that there is a new game
  //and the timer resets
  useEffect(reset, [props.field]);

  //----- jsx block -----

  return (
    <div className='clock-container'>
      <div className='clock'> {convertTo3Digit(duration)} </div>
    </div>
  );
}
