//----- imports ----------------------------------------------------------------

import { useEffect } from 'react';
import { convertTo2DArray, getIndex } from '../../utils/utils.js';
import Cell from './Cell.js';
import '../stylesheets/Board.css';


//----- export code block ------------------------------------------------------

export default function Board(props){

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

  function renderBoard(){
    let field = props.field;
    let cells = field.cells;
    let numColumns = field.dimensions.numColumns;
    let rows = convertTo2DArray(cells, numColumns);
    return (
      <div className='board' onClick={handleLeftClick}>
        {
          rows.map( (row,i) => (
            <div className='row' key={'row-' + i}>
              {
                row.map( (cell,j) => {
                  let index = getIndex(i, j, numColumns);
                  return (
                    <Cell key={`${i}-${j}`}
                          index={index}
                          outcome={props.outcome}
                          cell={cell} />
                  );
                })
              }
            </div>
          ))
        }
      </div>
    );
  }

  return (
    <>
    { renderBoard() }
    </>
  );

}
