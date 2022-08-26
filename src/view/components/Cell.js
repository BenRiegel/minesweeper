//hidden, swept, marked, correct-mark, incorrect-non-mark, incorrect-mark

//----- imports ----------------------------------------------------------------

import '../stylesheets/Cell.css';


//----- export code block ------------------------------------------------------

export default function Cell(props){

  //----- local functions -----

  function calcState(){
    let { board, index, gameOver, fieldValue } = props;
    let boardValue = board[index];
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

  function renderHidden(){
    return (
      <div className='cell hidden' data-index={props.index}></div>
    );
  }

  function renderMarked(){
    return (
      <div className='cell hidden mark' data-index={props.index}>*</div>
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
      <div className='cell revealed mark' data-index={props.index}>*</div>
    );
  }

  function renderIncorrectMark(){
    return (
      <div className='cell revealed mine false-positive' data-index={props.index}>*</div>
    );
  }

  function renderIncorrectNonMark(){
    return (
      <div className='cell revealed mine false-negative' data-index={props.index}>*</div>
    );
  }

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

};
