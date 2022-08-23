//----- export code block ------------------------------------------------------

export default function Select(props){

  function handleSelectChange(evt){
    let selectedDifficulty = evt.target.value;
    props.onChange(selectedDifficulty);
  }

  return(
    <select onChange={handleSelectChange} value={props.difficulty}>
      <option value='easy'>Easy</option>
      <option value='medium'>Medium</option>
      <option value='hard'>Hard</option>
    </select>
  );
}
