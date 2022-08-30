// module: Grid.js
// author: Ben Riegel
// overview: defines and exports the Grid component, which displays the game grid


//----- imports ----------------------------------------------------------------

import { useEffect } from 'react';
import Cell from './Cell.js';
import { convertTo2DArray, getIndex } from '../../utils/utils.js';
import '../stylesheets/Board.css';


//----- export code block ------------------------------------------------------

export default function Grid(props){

  //----- local functions -----

  //event handlers for left and right clicks
  function handleLeftClick(evt){
    if (evt.target.classList.contains('cell')){
      const cellIndex = Number(evt.target.dataset.index);
      props.onLeftClick(cellIndex);
    }
  }

  function handleRightClick(evt){
    evt.preventDefault();
    if (evt.target.classList.contains('cell')){
      const cellIndex = Number(evt.target.dataset.index);
      props.onRightClick(cellIndex);
    }
  }

  //----- effects -----

  //adds right-click event listener on mount and removes it when the component
  //unmounts
  useEffect( ()=>{
    document.addEventListener('contextmenu', handleRightClick);
    return ( ()=>{
      document.removeEventListener('contextmenu', handleRightClick);
    });
  }, []);

  //----- jsx block -----

  //renders the user board in a two-dimensional array
  function render(){
    const rows = convertTo2DArray(props.field, props.dimensions.numColumns);
    return (
      <div className='board' onClick={handleLeftClick}>
        {
          rows.map( (row,i) => (
            <div className='row' key={'row-' + i}>
              {
                row.map( (cell,j) => {
                  const index = getIndex(i, j, props.dimensions.numColumns);
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
