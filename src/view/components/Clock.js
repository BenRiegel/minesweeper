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

  useEffect( ()=>{
    start();
    return stop;
  }, []);

  useEffect( ()=>{
    if (props.gameOver){
      stop();
    }
  }, [props.gameOver]);

  useEffect(reset, [props.field]);

  //----- jsx -----

  return (
    <div className='clock-container'>
      <div className='clock'> {convertTo3Digit(duration)} </div>
    </div>
  );
}
