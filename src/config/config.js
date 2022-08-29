// module: config.js
// author: Ben Riegel
// overview: specifies the game levels and how they are configured (dimensions
// of the board and number of mines). It exports some constants and functions
// for retrieving the configuation variables


//----- local code block -------------------------------------------------------

//game level constants
const BEGINNER = 'Beginner';
const INTERMEDIATE = 'Intermediate';
const EXPERT = 'Expert';

//configuration for game levels
const levelsConfig = {
  [BEGINNER]:     {numRows:10, numColumns:10, numMines:10},
  [INTERMEDIATE]: {numRows:15, numColumns:15, numMines:40},
  [EXPERT]:       {numRows:16, numColumns:30, numMines:99}
}


//----- export code block ------------------------------------------------------

//array of level names
export const levels = Object.keys(levelsConfig);

export const initLevel = BEGINNER;

export function getDimensions(level){
  let {numRows, numColumns} = levelsConfig[level];
  return {numRows, numColumns};
}

export function getNumMines(level){
  return levelsConfig[level].numMines;
}
