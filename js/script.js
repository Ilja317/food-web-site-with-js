document.addEventListener("DOMContentLoaded",()=>{
  const tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        modal = require('./modules/modal'),
        cards = require('./modules/cards'),
        serverWindow = require('./modules/server'),
        sliders = require('./modules/sliders'),
        calc = require('./modules/calc');

        tabs();
        timer();
        cards();
        modal();
        serverWindow(); 
        sliders(); 
        calc(); 

        
})
