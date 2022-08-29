// module: Cell.js
// author: Ben Riegel
// overview: defines and exports the Cell component


//----- imports ----------------------------------------------------------------

import React from 'react'
import '../stylesheets/Cell.css';


//----- export code block ------------------------------------------------------

//React.memo used here to prevent unnecessary rerenders when the board state variable
//is updated but the cell props are not changed; the Cell is a pure component
const Cell = React.memo(function(props){

  //----- local functions -----
  //each cell may have one of six states:
  //hidden, swept, marked, correct-mark, incorrect-non-mark, incorrect-mark
  //the calcState function determines which of these states the cell has
  function calcState(){
    let { gameOver, boardValue, fieldValue } = props;
    let isSwept = (boardValue === 'swept');
    let isMarked = (boardValue === 'marked');
    let noAction = (boardValue === null);
    let hasMine = (fieldValue === 'mine');
    if (gameOver){
      if (noAction){
        if (hasMine){
          return 'incorrect-non-mark';
        } else {
          return 'hidden';
        }
      } else if (isMarked){
        if (hasMine){
          return 'correct-mark';
        } else {
          return 'incorrect-mark';
        }
      } else if (isSwept){
        if (hasMine){
          return 'incorrect-non-mark';
        } else {
          return 'swept';
        }
      }
    } else {
      if (noAction){
        return 'hidden';
      } else if (isMarked){
        return 'marked';
      } else if (isSwept){
        return 'swept';
      }
    }
  }

  //----- jsx block -----

  //the six functions below specify how the cell should be rendered based on
  //which of the six states it has; want to keep each render functions
  //separate in case I want to change how they are rendered at a later date

  function renderHidden(){
    return (
      <div className='cell hidden' data-index={props.index}></div>
    );
  }

  function renderMarked(){
    return (
      <div className='cell hidden mark' data-index={props.index}></div>
    );
  }

  function renderSwept(){
    return (
      <div className={ `cell revealed contig-mines-${props.fieldValue}` }
           data-index={props.index}>
      </div>
    );
  }

  function renderCorrectMark(){
    return (
      <div className='cell revealed mark' data-index={props.index}></div>
    );
  }

  function renderIncorrectMark(){
    return (
      <div className='cell revealed mark false-positive' data-index={props.index}></div>
    );
  }

  function renderIncorrectNonMark(){
    return (
      <div className='cell revealed mine false-negative' data-index={props.index}>*</div>
    );
  }

  //function that determiens the current state and executes the appropriate
  //render function
  function renderCell(){
    let state = calcState();
    if (state === 'hidden'){
      return renderHidden();
    } else if (state === 'marked'){
      return renderMarked()
    } else if (state === 'swept'){
      return renderSwept();
    } else if (state === 'correct-mark'){
      return renderCorrectMark();
    } else if (state === 'incorrect-mark'){
      return renderIncorrectMark();
    } else if (state === 'incorrect-non-mark'){
      return renderIncorrectNonMark();
    }
  }

  return renderCell();

});

export default Cell;
