//----- imports ----------------------------------------------------------------

import { useReducer, useEffect } from 'react';
import Field from '../../utils/field.js';
import { clone } from '../../utils/utils.js';
import reducer from '../../utils/state.js';
import Board from './Board.js';
import Select from './Select.js';
import Clock from './Clock.js';
import Mines from './Mines.js';
import Result from './Result.js';
import '../stylesheets/App.css';


//----- export code block ------------------------------------------------------

export default function App(props){

  function leftClickAction(cellIndex){
    dispatch( {actionType:'leftClick', cellIndex} );
  }

  function rightClickAction(cellIndex){
    dispatch( {actionType:'rightClick', cellIndex} );
  }

  function newGameAction(){
    dispatch( {actionType:'newGame'} );
  }

  function newDifficultyAction(selectedValue){
    dispatch( {actionType:'newDifficulty', selectedValue} );
  }

  const [state, dispatch] = useReducer(reducer, {
    clockStatus: 'run',
    difficulty: props.initDifficulty,
    field: new Field(props.initDifficulty),
    outcome: null,
  });

  useEffect( () => {
    if (state.clockStatus === 'reset'){
      dispatch( {actionType:'startClock'} );
    }
  }, [state]);

  return (
    <div className='App'>
      <header className='header'>
        <Mines field={state.field}/>
        <button onClick={newGameAction}>Start Over</button>
        <Select onChange={newDifficultyAction} value={state.difficulty}/>
        <Clock status={state.clockStatus}/>
      </header>
      <div className='container'>
        <Board field={state.field}
               outcome={state.outcome}
               onLeftClick={leftClickAction}
               onRightClick={rightClickAction}/>
        <Result outcome={state.outcome}/>
      </div>
    </div>
  );
}
