//----- export code block ------------------------------------------------------

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

export function convertTo2DArray(array, numColumns){
  let rows = [];
  for (let j = 0; j < numColumns; j++){
    let newRow = array.slice(j * numColumns, (j+1)*numColumns);
    rows.push(newRow);
  }
  return rows;
}

export function getIndex(rowIndex, columnIndex, numColumns){
  return rowIndex * numColumns + columnIndex;
}

export function getRowColumn(index, numColumns){
  let row = Math.floor(index / numColumns);
  let column = (index % numColumns);
  return {row, column};
}

export function doForContigCells(index, cells, {numRows, numColumns}, callback){
  let {row, column} = getRowColumn(index, numColumns);
  let maxRowIndex = numRows - 1;
  let maxColumnIndex = numColumns - 1;
  let surroundingIndices = [ [row-1, column-1],
                             [row-1, column],
                             [row-1, column+1],
                             [row, column-1],
                             [row, column+1],
                             [row+1, column-1],
                             [row+1, column],
                             [row+1, column+1] ];
  for (let [i, j] of surroundingIndices){
    if (i>=0 && i<=maxRowIndex && j>=0 && j<=maxColumnIndex){
      let contigCellIndex = getIndex(i, j, numColumns);
      let contigCell = cells[contigCellIndex];
      callback(contigCell, contigCellIndex);
    }
  }
}

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
