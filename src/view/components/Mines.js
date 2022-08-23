//----- imports ----------------------------------------------------------------

import { convertTo3Digit } from '../../utils/utils.js';
import '../stylesheets/Mines.css';


//----- export code block ------------------------------------------------------

export default function Mines(props){

  function renderMines(){
    let numRemainingMines = props.field.getNumRemainingMines();
    return convertTo3Digit(numRemainingMines);
  }

  return (
    <div className='mines-container'>
      <div className='mines'> {renderMines()} </div>
    </div>
  );
}
