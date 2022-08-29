// module: Select.js
// author: Ben Riegel
// overview: defines and exports the Select component, which creates a select
// menu with options corresponding to the game levels


//----- imports ----------------------------------------------------------------

import { levels, initLevel } from '../../config/config.js';


//----- export code block ------------------------------------------------------

export default function Select(props){

  //----- local functions -----

  //handles the new value event
  function handleValueChange(evt){
    let selectedValue = evt.target.value;
    props.onChange(selectedValue);
  }

  //----- jsx block -----

  return(
    <select onChange={handleValueChange} defaultValue={initLevel}>
      {
        levels.map( (level,index) => {
          return (
            <option value={level} key={index}>
              {level}
            </option>
          );
        })
      }
    </select>
  );
}
