//----- export code block ------------------------------------------------------

export default function Timer(){

  //----- private code block -----

  let duration = 0;
  let interval = null;
  let onTick = null;

  function setDuration(newValue){
    if (newValue !== duration){
      duration = newValue;
      onTick(duration);
    }
  }

  function tick(){
    setDuration(duration+1);
  }

  //----- public api -----

  return {
    setOnTick: function(callback){
      onTick = callback;
    },
    start: function(){
      if (interval === null){
        interval = setInterval(tick, 1000);
      }
    },
    stop: function(){
      if (interval !== null){
        clearInterval(interval);
        interval = null;
      }
    },
    clear: function(){
      this.stop();
      setDuration(0);
    },
  }
}
