//----- imports ----------------------------------------------------------------

import '../stylesheets/Result.css';


//----- export code block ------------------------------------------------------

export default function Result( {gameOver, didWin} ){

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
