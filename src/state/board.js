//----- imports ----------------------------------------------------------------

import { doForContigCells } from '../utils/utils.js';


//----- local code block -------------------------------------------------------

function sweepContigCells(board, field, dimensions, index){
  doForContigCells(index, board, dimensions, (contigCell, contigCellIndex) => {
    if (contigCell === null){
      board[contigCellIndex] = 'swept';
      let fieldValue = field[contigCellIndex];
      if (fieldValue === 0){
        sweepContigCells(board, field, dimensions, contigCellIndex);
      }
    }
  });
}

function checkFalseNegative(board, field){
  return board.reduce( (prev, boardValue, index)=>{
     let fieldValue = field[index];
     let isFalseNegative = (boardValue === 'swept' && fieldValue === 'mine');
     return (prev || isFalseNegative);
   }, false);
}

function checkFalsePositive(board, field){
  return board.reduce( (prev, boardValue, index)=>{
    let fieldValue = field[index];
    let isFalsePositive = (boardValue === 'marked' && fieldValue !== 'mine');
    return (prev || isFalsePositive);
  }, false);
}

function checkBoardComplete(board){
  return board.reduce( (prev, boardValue)=>{
    let hasAction = (boardValue !== null);
    return (prev && hasAction);
  }, true);
}


//----- export code block ------------------------------------------------------

export function sweep(board, field, dimensions, cellIndex){
  let newBoard = [...board];
  let boardValue = newBoard[cellIndex];
  if (boardValue === null){
    newBoard[cellIndex] = 'swept';
    let fieldValue = field[cellIndex];
    if (fieldValue === 0){
      sweepContigCells(newBoard, field, dimensions, cellIndex);
    }
  }
  return newBoard;
}

export function toggleMark(board, cellIndex){
  let newBoard = [...board];
  let boardValue = newBoard[cellIndex];
  if (boardValue === null){
    newBoard[cellIndex] = 'marked';
  } else if (boardValue === 'marked'){
    newBoard[cellIndex] = null;
  }
  return newBoard;
}

export function analyzeBoard(board, field){
  let hasFalseNegative = checkFalseNegative(board, field);
  if (hasFalseNegative){
    return {gameOver:true, didWin:false};
  }
  let boardComplete = checkBoardComplete(board);
  if (!boardComplete){
    return {gameOver:false, didWin:null};
  }
  let hasFalsePositive = checkFalsePositive(board, field);
  if (!hasFalsePositive){
    return {gameOver:true, didWin:true};
  }
}

export function getNumMarks(board){
  return board.reduce( (sum, value) => {
    return sum + (value === 'marked' ? 1 : 0);
  }, 0);
}

export default function Board( {numRows, numColumns} ){
  let numCells = numRows * numColumns;
  let board = Array(numCells).fill(null);
  return board;
}
