//----- imports ----------------------------------------------------------------

import Field from './field.js';
import { clone } from './utils.js';


function difficultyReducer( {actionType, selectedValue}, currentValue){
  let newValue;
  switch (actionType){
    case 'newDifficulty':
      newValue = selectedValue;
      break;
    default:
      newValue = currentValue;
      break;
  }
  return newValue;
}

function fieldReducer( {actionType, cellIndex}, currentValue, newDifficulty){
  let newValue;
  switch (actionType){
    case 'newDifficulty':
    case 'newGame':
      newValue = new Field(newDifficulty);
      break;
    case 'leftClick':
      newValue = clone(currentValue);
      newValue.sweep(cellIndex);
      break;
    case 'rightClick':
      newValue = clone(currentValue);
      newValue.toggleMine(cellIndex);
      break;
    default:
      newValue = currentValue;
      break;
  }
  return newValue;
}

function outcomeReducer( {actionType}, currentValue, newField){
  let newValue;
  switch (actionType){
    case 'newDifficulty':
    case 'newGame':
      newValue = null;
      break;
    case 'leftClick':
    case 'rightClick':
      newValue = newField.checkGameOver();
      break;
    default:
      newValue = currentValue;
      break;
  }
  return newValue;
}

function clockStatusReducer( {actionType}, newOutcome ){
  let newValue;
  switch (actionType){
    case 'startClock':
      newValue = 'run';
      break;
    case 'newDifficulty':
    case 'newGame':
      newValue = 'reset';
      break;
    case 'leftClick':
    case 'rightClick':
      newValue = (newOutcome === null) ? 'run' : 'stop';
      break;
    default:
      break;
  }
  return newValue;
}

export default function reducer(state, action){
  let newDifficulty = difficultyReducer(action, state.difficulty);
  let newField = fieldReducer(action, state.field, newDifficulty);
  let newOutcome = outcomeReducer(action, state.outcome, newField);
  let newClockStatus = clockStatusReducer(action, newOutcome);
  return {
    difficulty: newDifficulty,
    field: newField,
    outcome: newOutcome,
    clockStatus: newClockStatus,
  };
}
