// module: utils.js
// author: Ben Riegel
// overview: defines and exports various helper functions


//----- export code block ------------------------------------------------------

//returns a specified number of random integers between zero and a specified
//maximum value
export function createRandoms( {numRandoms, rangeMax} ){
  let randoms = [];
  while (randoms.length < numRandoms){
    let num = Math.floor(Math.random() * rangeMax);
    if (!randoms.includes(num)){
      randoms.push(num);
    }
  }
  return randoms;
}

//converts a one-dimensional array to a two-dimensional array
export function convertTo2DArray(array, numColumns){
  let rows = [];
  for (let j = 0; j < numColumns; j++){
    let newRow = array.slice(j * numColumns, (j+1)*numColumns);
    rows.push(newRow);
  }
  return rows;
}

//gets the index value in a 1d array from 2-d coordinates
export function getIndex(rowNum, columnNum, numColumns){
  return rowNum * numColumns + columnNum;
}

//gets the 2-d coordinates from index value in 1d array
export function getRowColumn(index, numColumns){
  const row = Math.floor(index / numColumns);
  const column = (index % numColumns);
  return {row, column};
}

//function that, for any specified cell in a 2-d array, loops over its contiguous
//cells and calls a callback; checks for edge cells that don't have all 8 contigous
//cells
export function doForContigCells(index, cells, {numRows, numColumns}, callback){
  const {row, column} = getRowColumn(index, numColumns);
  const maxRowIndex = numRows - 1;
  const maxColumnIndex = numColumns - 1;
   const surroundingIndices = [ [row-1, column-1],
                                [row-1, column],
                                [row-1, column+1],
                                [row, column-1],
                                [row, column+1],
                                [row+1, column-1],
                                [row+1, column],
                                [row+1, column+1] ];
  for (let [i, j] of surroundingIndices){
    if (i>=0 && i<=maxRowIndex && j>=0 && j<=maxColumnIndex){
      const contigCellIndex = getIndex(i, j, numColumns);
      const contigCell = cells[contigCellIndex];
      callback(contigCell, contigCellIndex);
    }
  }
}

//converts a number to a 3-digit string
export function convertTo3Digit(num){
  if (num < 10){
    return ('00'+ num);
  } else if (num < 100){
    return ('0' + num);
  } else if (num < 1000){
    return num.toString();
  } else {
    return convertTo3Digit(num % 1000);
  }
}
