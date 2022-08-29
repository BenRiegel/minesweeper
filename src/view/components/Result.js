// module: Result.js
// author: Ben Riegel
// overview: defines and exports the Result component, which displays the outcome
// of the game when the gme is over


//----- imports ----------------------------------------------------------------

import '../stylesheets/Result.css';


//----- export code block ------------------------------------------------------

export default function Result( {gameOver, didWin} ){

  //----- jsx block -----

  function render(){
    if (gameOver){
      return (
        <div className='result'>
          <div>
            {didWin ? 'You win!' : 'You lose!'}
          </div>
        </div>
      );
    }
  }

  return render();
}
