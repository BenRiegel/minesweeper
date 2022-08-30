// module: board.js
// author: Ben Riegel
// overview: defines and exports functions for creating and manipulating board
// arrays.


//----- imports ----------------------------------------------------------------

import { doForContigCells } from '../utils/utils.js';


//----- local code block -------------------------------------------------------

//if a swept cell has zero contiguous mines, it recursively sweeps those cells
function sweepContigCells(board, field, dimensions, index){
  doForContigCells(index, board, dimensions, (contigCell, contigCellIndex) => {
    if (contigCell === null){
      board[contigCellIndex] = 'swept';
      const fieldValue = field[contigCellIndex];
      if (fieldValue === 0){
        sweepContigCells(board, field, dimensions, contigCellIndex);
      }
    }
  });
}

//checks board to see if there is a false negative (cell that is swept but
//has a mine)
function checkFalseNegative(board, field){
  return board.reduce( (prev, boardValue, index)=>{
     const fieldValue = field[index];
     const isFalseNegative = (boardValue === 'swept' && fieldValue === 'mine');
     return (prev || isFalseNegative);
   }, false);
}

//checks board to see if there is a false positive (cell that is marked but
//does not have a mine)
function checkFalsePositive(board, field){
  return board.reduce( (prev, boardValue, index)=>{
    const fieldValue = field[index];
    const isFalsePositive = (boardValue === 'marked' && fieldValue !== 'mine');
    return (prev || isFalsePositive);
  }, false);
}

//checks to see if a board is complete (has all cells swept or marked)
function checkBoardComplete(board){
  return board.reduce( (prev, boardValue)=>{
    const hasAction = (boardValue !== null);
    return (prev && hasAction);
  }, true);
}


//----- export code block ------------------------------------------------------

//returns new board with the specified cell swept (and contiguous cells swept
//if the specified cell has no contig mines)
export function sweep(board, field, dimensions, cellIndex){
  let newBoard = [...board];
  const boardValue = newBoard[cellIndex];
  if (boardValue === null){                           //check to make sure no other action associated with cell
    newBoard[cellIndex] = 'swept';
    const fieldValue = field[cellIndex];
    if (fieldValue === 0){
      sweepContigCells(newBoard, field, dimensions, cellIndex);
    }
  }
  return newBoard;
}

//returns new board with the mark toggled at the specified cell
export function toggleMark(board, cellIndex){
  let newBoard = [...board];
  const boardValue = newBoard[cellIndex];
  if (boardValue === null){
    newBoard[cellIndex] = 'marked';
  } else if (boardValue === 'marked'){
    newBoard[cellIndex] = null;
  }
  return newBoard;
}

//analyzes board and returns obj specifying whether the game is over
//and if so, whether the user won
export function analyzeBoard(board, field){
  const hasFalseNegative = checkFalseNegative(board, field);
  if (hasFalseNegative){
    return {gameOver:true, didWin:false};
  }
  const boardComplete = checkBoardComplete(board);
  if (!boardComplete){
    return {gameOver:false, didWin:null};
  }
  const hasFalsePositive = checkFalsePositive(board, field);
  if (!hasFalsePositive){
    return {gameOver:true, didWin:true};
  }
}

//calculates the number of marks on the board
export function getNumMarks(board){
  return board.reduce( (sum, value) => {
    return sum + (value === 'marked' ? 1 : 0);
  }, 0);
}

//creates empty board
export default function Board( {numRows, numColumns} ){
  const numCells = numRows * numColumns;
  const board = Array(numCells).fill(null);
  return board;
}
