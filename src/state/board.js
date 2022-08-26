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

function getNumMarkedMines(cells){
  return cells.reduce( (sum, cell) => {
    return sum + (cell.isMarked ? 1 : 0);
  }, 0);
}

function checkFalseNegative(board, field){
  for (let i = 0; i < board.length; i++){
    let boardValue = board[i];
    let fieldValue = field[i];
    if (boardValue === 'swept' && fieldValue === 'mine'){
      return true;
    }
  }
  return false;
}

function checkFalsePositive(board, field){
  for (let i = 0; i < board.length; i++){
    let boardValue = board[i];
    let fieldValue = field[i];
    if (boardValue === 'marked' && fieldValue !== 'mine'){
      return true;
    }
  }
  return false;
}

function checkBoardComplete(board){
  for (let cell of board){
    if (cell === null){
      return false;
    }
  }
  return true;
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

export default function Board(dimensions){
  let numCells = dimensions.numRows * dimensions.numColumns;
  let board = Array(numCells).fill(null);
  return board;
}
