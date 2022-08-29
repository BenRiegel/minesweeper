// module: field.js
// author: Ben Riegel
// overview: defines and exports the function for creating a new field array


//----- imports ----------------------------------------------------------------

import { createRandoms, doForContigCells } from '../utils/utils.js';


//----- local code block -------------------------------------------------------

//creates new array with cells with matching mine indices assigned the value 'mine'
function createCellsWithMines(emptyCells, mineIndices){
  return emptyCells.map( (cell, index) => {
    if (mineIndices.includes(index)){
      return 'mine';
    }
    return null;
  });
}

//create new array with cells assigned either 'mine' or the number of contiguous
//mines
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

//creates empty cells, assigns value of 'mine' to those with mine indices
//and assigns the number of contig mines for the non-mine cells
function createCells(numCells, dimensions, mineIndices){
  let emptyCells = Array(numCells).fill(null);
  let cellsWithMines = createCellsWithMines(emptyCells, mineIndices);
  let completeCells = createCellsWithNumContigMines(cellsWithMines, dimensions);
  return completeCells;
}


//----- export code block ------------------------------------------------------

//creates new Field array; cells with mines have the value 'mine'; all other cells
//have a numerical value corresponding to the number of contiguous mines
export default function Field(dimensions, numMines){
  let numCells = dimensions.numRows * dimensions.numColumns;
  let mineIndices = createRandoms( {numRandoms:numMines, rangeMax:numCells} );
  let cells = createCells(numCells, dimensions, mineIndices);
  return cells;
}
