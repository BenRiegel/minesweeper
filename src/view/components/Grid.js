//----- imports ----------------------------------------------------------------

import { useEffect } from 'react';
import Cell from './Cell.js';
import { convertTo2DArray, getIndex } from '../../utils/utils.js';
import '../stylesheets/Board.css';


//----- export code block ------------------------------------------------------

export default function Grid(props){

  function handleLeftClick(evt){
    if (evt.target.classList.contains('cell')){
      let cellIndex = Number(evt.target.dataset.index);
      props.onLeftClick(cellIndex);
    }
  }

  function handleRightClick(evt){
    evt.preventDefault();
    if (evt.target.classList.contains('cell')){
      let cellIndex = Number(evt.target.dataset.index);
      props.onRightClick(cellIndex);
    }
  }

  useEffect( ()=>{
    document.addEventListener('contextmenu', handleRightClick);
    return ( ()=>{
      document.removeEventListener('contextmenu', handleRightClick);
    });
  }, []);

  //----- jsx block -----

  function render(){
    let rows = convertTo2DArray(props.field, props.dimensions.numColumns);
    return (
      <div className='board' onClick={props.gameOver ? null : handleLeftClick}>
        {
          rows.map( (row,i) => (
            <div className='row' key={'row-' + i}>
              {
                row.map( (cell,j) => {
                  let index = getIndex(i, j, props.dimensions.numColumns);
                  return(
                    <Cell key={`${i}-${j}`}
                          index={index}
                          fieldValue={props.field[index]}
                          boardValue={props.board[index]}
                          gameOver={props.gameOver}/>
                    );
                })
              }
            </div>
          ))
        }
      </div>
    );
  }

  return render();
}
