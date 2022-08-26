//----- imports ----------------------------------------------------------------

import Field from './field.js';
import Board from './board.js';
import { sweep, toggleMark, getNumMarks, analyzeBoard } from './board.js';
import { initLevel, getDimensions, getNumMines } from '../config/config.js';


//----- local code block -------------------------------------------------------

function levelReducer(prevState, action){
  let newValue;
  switch(action.type){
    case 'init':
    case 'newLevel':
      newValue = action.newValue;
      break;
    default:
      newValue = prevState.level;
  }
  return newValue;
}

function fieldReducer(prevState, action, newDimensions, newNumMines){
  let newValue;
  switch (action.type){
    case 'init':
    case 'newLevel':
    case 'newGame':
      newValue = new Field(newDimensions, newNumMines);
      break;
    default:
      newValue = prevState.field;
      break;
  }
  return newValue;
}

function boardReducer(prevState, action, newField, newDimensions){
  let newValue;
  switch (action.type){
    case 'init':
    case 'newLevel':
    case 'newGame':
      newValue = new Board(newDimensions);
      break;
    case 'leftClick':
      newValue = sweep(prevState.board, newField, newDimensions, action.cellIndex);
      break;
    case 'rightClick':
      newValue = toggleMark(prevState.board, action.cellIndex);
      break;
    default:
      newValue = prevState.board;
      break;
  }
  return newValue;
}

function numMarksReducer(prevState, action, newBoard){
  let newValue;
  switch (action.type){
    case 'init':
    case 'newLevel':
    case 'newGame':
      newValue = 0;
      break;
    case 'rightClick':
      newValue = getNumMarks(newBoard);
      break;
    default:
      newValue = prevState.numMarks;
      break;
  }
  return newValue;
}


//----- export code block ------------------------------------------------------

export function reducer(prevState, action){
  let newLevel = levelReducer(prevState, action);
  let newDimensions = getDimensions(newLevel);
  let newNumMines = getNumMines(newLevel);
  let newField = fieldReducer(prevState, action, newDimensions, newNumMines);
  let newBoard = boardReducer(prevState, action, newField, newDimensions);
  let newNumMarks = numMarksReducer(prevState, action, newBoard);
  let gameAnalysis = analyzeBoard(newBoard, newField);
  let newGameOver = gameAnalysis.gameOver;
  let newDidWin = gameAnalysis.didWin;
  return {
    level: newLevel,
    dimensions: newDimensions,
    numMines: newNumMines,
    field: newField,
    board: newBoard,
    numMarks: newNumMarks,
    gameOver: newGameOver,
    didWin: newDidWin,
  };
}

const initState = reducer(null, {type:'init', newValue:initLevel} );

export { initState };
