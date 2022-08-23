//----- imports ----------------------------------------------------------------

import '../stylesheets/Result.css';


//----- export code block ------------------------------------------------------

export default function Result(props){

  function renderResult(){
    if (props.outcome === 'win'){
      return (<div>You win!</div>);
    } else if (props.outcome === 'lose'){
      return (<div>You lose!</div>);
    }
  }

  if (props.outcome){
    return (
      <div className='result'>
        {renderResult()}
      </div>
    );
  }
}
