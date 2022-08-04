function timer() {
  let endTime = "2023-04-01";
  function ourTime (time) {
    let getTime = Date.parse(time) - Date.parse(new Date()),
        days = Math.floor(getTime / (1000 * 60 * 60 * 24)),
        hours = Math.floor(getTime / (1000 * 60 * 60) % 24),
        minutes = Math.floor(getTime / (1000 * 60) % 60),
        seconds = Math.floor(getTime / 1000 % 60);
        return {
          "days" : days,
          "hours" : hours,
          "minutes" : minutes,
          "seconds" : seconds,
        }
  }
  function returnTimer(setTime, puth) {
    let time = ourTime(setTime);
    function setTimer(puth) {
      let ourTimer = document.querySelector(puth),
          day = ourTimer.querySelector("#days"),
          hour = ourTimer.querySelector("#hours"),
          minute = ourTimer.querySelector("#minutes"),
          second = ourTimer.querySelector("#seconds");
      function doubleNumber(number) {
        if(number < 10){
          return "0" + number 
        }else{return number}
      }
      day.innerHTML = doubleNumber(time["days"]);
      hour.innerHTML = doubleNumber(time["hours"]);
      minute.innerHTML = doubleNumber(time["minutes"]);
      second.innerHTML = doubleNumber(time["seconds"]);
      }
      setTimer(puth);
      if(setTime <= 0) {
        clearInterval(startTimer)
      }
    }
    returnTimer(endTime,".promotion__timer");
    function onTimer() {
      returnTimer(endTime,".promotion__timer");
    }
    startTimer = setInterval(onTimer,1000);
}
module.exports = timer;