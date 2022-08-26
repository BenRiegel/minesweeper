//----- local code block -------------------------------------------------------

const EASY = 'Easy';
const MEDIUM = 'Medium';
const HARD = 'Hard';

const levelsConfig = {
  [EASY]:   {numRows:10, numColumns:10, numMines:10},
  [MEDIUM]: {numRows:15, numColumns:15, numMines:15},
  [HARD]:   {numRows:20, numColumns:20, numMines:99}
}


//----- export code block ------------------------------------------------------

export const levels = Object.keys(levelsConfig);

export const initLevel = EASY;

export function getDimensions(level){
  return {
    numRows: levelsConfig[level].numRows,
    numColumns: levelsConfig[level].numColumns
  }
}

export function getNumMines(level){
  return levelsConfig[level].numMines;
}
