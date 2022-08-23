//----- imports ----------------------------------------------------------------

import { createRandoms, doForContigCells, getIndex, getRowColumn } from './utils.js';


function getFieldDimensions(difficulty){
  switch (difficulty) {
    case 'easy':
      return {numRows:10, numColumns:10};
    case 'medium':
      return {numRows:15, numColumns:15};
    case 'hard':
      return {numRows:20, numColumns:20};
    default:
      console.log('error');
  }
}

function getNumMines(difficulty){
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 30;
    case 'hard':
      return 99;
    default:
      console.log('error');
  }
}

function createCellsWithMines(emptyCells, mineIndices){
  return emptyCells.map( (cell, index) => {
    return {
      hasMine: mineIndices.includes(index),
      numContigMines: 0,
      isMarked: false,
      isSwept: false,
    };
  });
}

function createCellsWithNumContigMines(cells, dimensions){
  return cells.map( (cell, index)=>{
    if (!cell.hasMine){
      doForContigCells(index, cells, dimensions, (contigCell)=>{
        if (contigCell.hasMine){
          cell.numContigMines += 1;
        }
      });
    }
    return cell;
  });
}

function createCells(numCells, dimensions, mineIndices){
  let emptyCells = Array(numCells).fill(null);
  let cellsWithMines = createCellsWithMines(emptyCells, mineIndices);
  let completeCells = createCellsWithNumContigMines(cellsWithMines, dimensions);
  return completeCells;
}

function sweepContigCells(index, cells, dimensions){
  doForContigCells(index, cells, dimensions, (contigCell, contigCellIndex) => {
    if (!contigCell.isSwept && !contigCell.isMarked){
      contigCell.isSwept = true;
      if (contigCell.numContigMines === 0){
        sweepContigCells(contigCellIndex, cells, dimensions);
      }
    }
  });
}

function getNumMarkedMines(cells){
  return cells.reduce( (sum, cell) => {
    return sum + (cell.isMarked ? 1 : 0);
  }, 0);
}

function checkFalseNegative(cells){  //reduce here?
  for (let cell of cells){
    if (cell.hasMine && cell.isSwept){
      return true;
    }
  }
  return false;
}

function checkFalsePositive(cells){
  for (let cell of cells){
    if (!cell.hasMine && cell.isMarked){
      return true;
    }
  }
  return false;
}

function checkBoardComplete(cells){
  for (let cell of cells){
    let noAction = !cell.isSwept && !cell.isMarked;
    if (noAction){
      return false;
    }
  }
  return true;
}

//------------------------------------------------------------------------------

export default function Field(difficulty){
  let numMines = getNumMines(difficulty);
  let dimensions = getFieldDimensions(difficulty);
  let numCells = dimensions.numRows * dimensions.numColumns;
  let mineIndices = createRandoms( {numRandoms:numMines, rangeMax:numCells} );
  let cells = createCells(numCells, dimensions, mineIndices);

  return{
    cells,
    dimensions,
    numMines,
    sweep: function(cellIndex){
      let cell = this.cells[cellIndex];
      if (!cell.isMarked){
        cell.isSwept = true;
        if (cell.numContigMines === 0){
          sweepContigCells(cellIndex, this.cells, this.dimensions);
        }
      }
    },
    toggleMine: function(cellIndex){
      let cell = this.cells[cellIndex];
      if (!cell.isSwept){
        cell.isMarked = !cell.isMarked;
      }
    },
    checkGameOver: function(){
      let hasFalseNegative = checkFalseNegative(this.cells);
      if (hasFalseNegative){
        return 'lose';
      }
      let boardComplete = checkBoardComplete(this.cells);
      if (!boardComplete){
        return null;
      }
      let hasFalsePositive = checkFalsePositive(this.cells);
      if (!hasFalsePositive){
        return 'win';
      }
    },
    getNumRemainingMines: function(){
      let numMineMarks = getNumMarkedMines(this.cells);
      return (this.numMines - numMineMarks);
    },
  }

}
