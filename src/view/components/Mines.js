//----- imports ----------------------------------------------------------------

import { convertTo3Digit } from '../../utils/utils.js';
import '../stylesheets/Mines.css';


//----- export code block ------------------------------------------------------

export default function Mines( {numMines, numMarks} ){

  function render(){
    let numRemaining = numMines - numMarks;
    let numRemaining3Digit = convertTo3Digit(numRemaining);
    return (
      <div className='mines-container'>
        <div className='mines'> {numRemaining3Digit} </div>
      </div>
    );
  }

  return render();
}
