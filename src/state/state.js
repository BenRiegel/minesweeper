// module: state.js
// author: Ben Riegel
// overview: defines and exports the main state reducer function and the
// initial state value, which is based on the initial game level specified
// in the config file


//----- imports ----------------------------------------------------------------

import Field from './field.js';
import Board from './board.js';
import { sweep, toggleMark, getNumMarks, analyzeBoard } from './board.js';
import { initLevel, getDimensions, getNumMines } from '../config/config.js';


//----- local code block -------------------------------------------------------
// this block contains reducer functions for specific state variables

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

// main reducer function; calculates new values for each state variable; returns
// new value for state variable
export function reducer(prevState, action){
  const newLevel = levelReducer(prevState, action);
  const newDimensions = getDimensions(newLevel);
  const newNumMines = getNumMines(newLevel);
  const newField = fieldReducer(prevState, action, newDimensions, newNumMines);
  const newBoard = boardReducer(prevState, action, newField, newDimensions);
  const newNumMarks = numMarksReducer(prevState, action, newBoard);
  const gameAnalysis = analyzeBoard(newBoard, newField);
  const newGameOver = gameAnalysis.gameOver;
  const newDidWin = gameAnalysis.didWin;
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

//calculates the initial state variable
const initState = reducer(null, {type:'init', newValue:initLevel} );

export { initState };
