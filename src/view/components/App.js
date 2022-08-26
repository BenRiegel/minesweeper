//----- imports ----------------------------------------------------------------

import { useReducer } from 'react';
import { reducer, initState } from '../../state/state.js';
import Grid from './Grid.js';
import Select from './Select.js';
import Clock from './Clock.js';
import Mines from './Mines.js';
import Result from './Result.js';
import '../stylesheets/App.css';


//----- export code block ------------------------------------------------------

export default function App(){

  //----- state variable -----

  const [state, newStateAction] = useReducer(reducer, initState);

  //----- user actions -----

  function leftClickEvent(cellIndex){
    newStateAction( {type:'leftClick', cellIndex} );
  }

  function rightClickEvent(cellIndex){
    newStateAction( {type:'rightClick', cellIndex} );
  }

  function newGameEvent(){
    newStateAction( {type:'newGame'} );
  }

  function newLevelEvent(selectedLevel){
    newStateAction( {type:'newLevel', newValue:selectedLevel} );
  }

  //----- jsx block -----

  return (
    <div className='App'>
      <header className='header'>
        <Mines numMines={state.numMines} numMarks={state.numMarks}/>
        <button onClick={newGameEvent}>Start Over</button>
        <Select onChange={newLevelEvent}/>
        <Clock field={state.field} gameOver={state.gameOver}/>
      </header>
      <div className='container'>
        <Grid field={state.field}
              board={state.board}
              dimensions={state.dimensions}
              gameOver={state.gameOver}
              onLeftClick={leftClickEvent}
              onRightClick={rightClickEvent}/>
        <Result gameOver={state.gameOver} didWin={state.didWin}/>
      </div>
    </div>
  );
}
