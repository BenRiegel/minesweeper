//----- imports ----------------------------------------------------------------

import { createRandoms, doForContigCells } from '../utils/utils.js';


//----- local code block -------------------------------------------------------

function createCellsWithMines(emptyCells, mineIndices){
  return emptyCells.map( (cell, index) => {
    if (mineIndices.includes(index)){
      return 'mine';
    }
    return null;
  });
}

function createCellsWithNumContigMines(cells, dimensions){
  return cells.map( (cell, index)=>{
    if (cell === 'mine'){
      return cell;
    } else {
      let numContigMines = 0;
      doForContigCells(index, cells, dimensions, (contigCell)=>{
        if (contigCell === 'mine'){
          numContigMines += 1;
        }
      });
      return numContigMines;
    }
  });
}

function createCells(numCells, dimensions, mineIndices){
  let emptyCells = Array(numCells).fill(null);
  let cellsWithMines = createCellsWithMines(emptyCells, mineIndices);
  let completeCells = createCellsWithNumContigMines(cellsWithMines, dimensions);
  return completeCells;
}


//----- export code block ------------------------------------------------------

export default function Field(dimensions, numMines){
  let numCells = dimensions.numRows * dimensions.numColumns;
  let mineIndices = createRandoms( {numRandoms:numMines, rangeMax:numCells} );
  let cells = createCells(numCells, dimensions, mineIndices);
  return cells;
}
