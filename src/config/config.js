//----- local code block -------------------------------------------------------

const BEGINNER = 'Beginner';
const INTERMEDIATE = 'Intermediate';
const EXPERT = 'Expert';

const levelsConfig = {
  [BEGINNER]:     {numRows:10, numColumns:10, numMines:10},
  [INTERMEDIATE]: {numRows:15, numColumns:15, numMines:40},
  [EXPERT]:       {numRows:16, numColumns:30, numMines:99}
}


//----- export code block ------------------------------------------------------

export const levels = Object.keys(levelsConfig);

export const initLevel = BEGINNER;

export function getDimensions(level){
  return {
    numRows: levelsConfig[level].numRows,
    numColumns: levelsConfig[level].numColumns
  }
}

export function getNumMines(level){
  return levelsConfig[level].numMines;
}
