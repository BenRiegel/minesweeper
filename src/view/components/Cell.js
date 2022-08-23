//----- imports ----------------------------------------------------------------

import '../stylesheets/Cell.css';


//----- export code block ------------------------------------------------------

export default function Cell(props){

  function renderContent(cell){
    if ((props.outcome && cell.hasMine) || cell.isMarked){
      return '*';
    }
    if (cell.isSwept && (cell.numContigMines > 0)){
      return cell.numContigMines;
    }
  }

  function getClassNames(cell){
    let classes = ['cell'];
    let noAction = (!cell.isMarked && !cell.isSwept);
    let gameOver = props.outcome;
    if (gameOver){
      if (noAction){
        if (cell.hasMine){
          classes.push('mine');
          classes.push('revealed');
          classes.push('false-negative');
        } else {
          classes.push('hidden');
        }
      } else if (cell.isMarked){
        classes.push('mine');
        classes.push('revealed');
        if (!cell.hasMine){
          classes.push('false-positive');
        }
      } else if (cell.isSwept){
        classes.push('revealed');
        if (cell.hasMine){
          classes.push('false-negative');
          classes.push('mine');
        }
      }
    } else {
      if (noAction){
        classes.push('hidden');
      } else if (cell.isMarked){
        classes.push('hidden');
        classes.push('mine');
      } else if (cell.isSwept){
        classes.push('revealed');
      }
    }
    return classes.join(' ');
  }

  function getNumMines(cell){
    if (!cell.isMarked && cell.numContigMines > 0){
      return cell.numContigMines;
    }
  }

  return (
    <div className={getClassNames(props.cell)}
         data-index={props.index}
         data-mines={getNumMines(props.cell)}>
      {
        renderContent(props.cell)
      }
    </div>
  );
};
