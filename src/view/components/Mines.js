// module: Mines.js
// author: Ben Riegel
// overview: defines and exports the Mines component, which displays the number
// of mines remaining to be marked


//----- imports ----------------------------------------------------------------

import { convertTo3Digit } from '../../utils/utils.js';
import '../stylesheets/Mines.css';


//----- export code block ------------------------------------------------------

export default function Mines( {numMines, numMarks} ){

  //----- jsx block -----

  function render(){
    const numRemaining = numMines - numMarks;
    const numRemaining3Digit = convertTo3Digit(numRemaining);
    return (
      <div className='mines-container'>
        <div className='mines'> {numRemaining3Digit} </div>
      </div>
    );
  }

  return render();
}
