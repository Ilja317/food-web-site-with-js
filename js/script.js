    import 'core-js/actual';
    import tabs from './modules/tabs';
    import timer from './modules/timer';
    import modal from './modules/modal';
    import cards from './modules/cards';
    import serverPost from './modules/thanksModal';
    import {openModal} from './modules/modal';
    import {closeModal} from './modules/modal';
    import slider from './modules/sliders';
    import calc from './modules/calc';
document.addEventListener("DOMContentLoaded",()=>{
        let time = setTimeout(()=>{openModal(time)},5000)
        tabs(".tabheader__items",".tabheader__item",".tabcontent","tabheader__item_active");
        timer(".promotion__timer","2023-04-01");
        cards();
        modal(openModal,closeModal,time);
        serverPost(openModal,closeModal,time); 
        slider({
          wrapp: ".offer__slider-wrapper",
          sledeS: ".offer__slide",
          prev: ".offer__slider-prev",
          offerSled: ".offer__slider",
          next: ".offer__slider-next",
          offerSliderIn: ".offer__slider-iner"}); 
        calc();    
})
