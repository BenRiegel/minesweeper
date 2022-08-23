//----- imports ----------------------------------------------------------------

import { useEffect, useState, useRef } from 'react';
import { convertTo3Digit } from '../../utils/utils.js';
import Timer from '../../utils/timer.js';
import '../stylesheets/Clock.css';


//----- export code block ------------------------------------------------------

export default function Clock(props){

  const [duration, setDuration] = useState(0);
  const timer = useRef( new Timer() );

  function renderDuration(){
    return convertTo3Digit(duration);
  }

  useEffect( () => {
    timer.current.setOnTick(setDuration);
    return ()=>{
      timer.current.clear();
    }
  }, []);

  useEffect( () => {
    switch(props.status){
      case 'reset':
        timer.current.clear();
        break;
      case 'run':
        timer.current.start();
        break;
      case 'stop':
        timer.current.stop();
        break;
      default:
        break;
    }
  }, [props.status]);

  return (
    <div className='clock-container'>
      <div className='clock'> {renderDuration()} </div>
    </div>
  );
}
