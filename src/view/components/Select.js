import { levels, initLevel } from '../../config/config.js';

//----- export code block ------------------------------------------------------

export default function Select(props){

  function handleValueChange(evt){
    let selectedValue = evt.target.value;
    props.onChange(selectedValue);
  }

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
