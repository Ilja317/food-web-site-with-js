/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
      // для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
      // для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
      const choose = document.querySelector(".calculating__result span");
      let sex,weight,height,age,ratio;
      if(localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
      }else{
        sex = "female"
        localStorage.setItem("sex","female")
      }
      if(localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
      }else{
        ratio = "1.375"
        localStorage.setItem("ratio","1.375")
      }
      function changeSelect(selector,active) {
        let elements = document.querySelectorAll(`${selector} .calculating__choose-item`)
        elements.forEach(i => {
          i.classList.remove(active);
          if(i.getAttribute("data-ratio") === localStorage.getItem("ratio")){
            i.classList.add(active)                     
          }else if(i.getAttribute("id") === localStorage.getItem("sex")) {
            i.classList.add(active)
          }
        })
      }
      changeSelect("#gender","calculating__choose-item_active");
      changeSelect(".calculating__choose_big","calculating__choose-item_active");
      function calcTo () {
        if(!sex || !weight || !height || !age || !ratio) {
          choose.textContent = "____"
        }else {
          if(sex == "female"){
            choose.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
          }else {
            choose.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
          }
        }
      }calcTo();
      function getStaticInfo (parent,acivSelector) {
        const elements = document.querySelectorAll(`${parent} .calculating__choose-item`)
        elements.forEach(el => {
          el.addEventListener('click',(e) => {
            if(e.target.getAttribute("data-ratio")){
              ratio = e.target.getAttribute("data-ratio");
              localStorage.setItem('ratio',ratio);
            }else {
              sex = e.target.getAttribute("id");
              localStorage.setItem("sex",sex);
            }
            elements.forEach(el => el.classList.remove(acivSelector));
            el.classList.add(acivSelector);
            calcTo();
          }) 
        })
      }function getDinamicInfo(){
        const dinamic = document.querySelectorAll(".calculating__choose_medium .calculating__choose-item");
        dinamic.forEach(i => {
          i.addEventListener("input",(e)=>{
            if(i.value.match(/\D/ig)) {
              i.style.border = "1px solid red"
            }else {
              i.style.border = "none"
            }
            switch(i.getAttribute("id")) {
              case "height" :
                height = +i.value
                break;
              case "weight" : 
                weight = +i.value
                break;
              case "age" :
                age = +i.value
                break;
            }
            calcTo();
          })
        })
      }
      getStaticInfo("#gender","calculating__choose-item_active");
      getStaticInfo(".calculating__choose_big","calculating__choose-item_active");
      getDinamicInfo();
}
module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
  class NewSubject {
    constructor(src,alt,title,descr,price,parent,...clasess) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.usd = 27;
      this.transferUHA();
      this.parent = parent;
      this.clasess = clasess || "menu__item";
    }
    transferUHA() {
      this.price = this.price * this.usd
    }
    include() {
      let element = document.createElement("div");
      let myParent = document.querySelector(this.parent);
      
      element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>`
          myParent.append(element);
          if(this.clasess.length > 0) {
            element.classList.add("menu__item");
            this.clasess.forEach((item) => {
              element.classList.add(item);
            });
          }else{
            element.classList.add("menu__item");
          }
          this.element = element;
    }
  }
    fetch("http://localhost:3000/menu")
    .then(data=> data.json())
    .then(arr => {
      console.log(arr);
      arr.forEach(({img,alt,title,descr,price}) => {
        const obj = new NewSubject(img,alt,title,descr,price,".menu__field .container");
        obj.include();
      })
    })
}
module.exports = cards;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modalWindow() {
  const btn = document.querySelectorAll("[data-modal]"),
          modal = document.querySelector("[data-modal-open]");
    
    let timer;

    function openModal() {
      modal.classList.add("show");
      modal.classList.remove("hire");
      document.documentElement.style.overflow = "hidden";
      clearTimeout(timer);
    }
    function closeModal() {
      const loadingEl = document.querySelector("form").querySelector("[data-loading]");
      if(document.querySelector("form").querySelector("[data-loading]")) {
        document.querySelector("form").querySelector("[data-loading]").remove();
      }
      modal.classList.add("hire");
      modal.classList.remove("show");
      document.documentElement.style.overflow = "";
      if(Boolean(document.querySelector("[data-messeage-dialog]"))){
        document.querySelector("[data-messeage-dialog]").remove();
      };if(document.querySelector(".modal__dialog").classList.contains('hire')){
        document.querySelector(".modal__dialog").classList.remove("hire");
      }
    }
    btn.forEach(item => {
      item.addEventListener("click",openModal);
    })
    
    timer = setTimeout(openModal,30000)
    let scroleOpen = 1;
    window.addEventListener("scroll",()=> {
      if(Math.round(window.pageYOffset + document.documentElement.clientHeight) === document.documentElement.scrollHeight && scroleOpen == 1) {
        openModal();
        scroleOpen = 0;
      }
    })
    modal.addEventListener("click",function(event) {
      if(event.target && event.target.classList.contains("show") || event.target.getAttribute("date-close") == "") 
      {
        closeModal();
      }
    })
}
module.exports = modalWindow;

/***/ }),

/***/ "./js/modules/server.js":
/*!******************************!*\
  !*** ./js/modules/server.js ***!
  \******************************/
/***/ ((module) => {

function serverPost() {
  const forms = document.querySelectorAll("form"),
          requestMessage = {
              "loading": "/img/svg/5.2 spinner.svg",
              "sucesses": "All is sucesses",
              "eror": "An error has occurred"
            };
    forms.forEach(item => {
      postForm(item)
    })
  const  createPost = async (src,data)=> {
  const res = await fetch(src, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: data,
        })
        if(!res.ok){
          throw new Error("Dont could creat new post " + url + " because " + res.status)
        }
        return await res;
    }
    function postForm(form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const requestStatus = document.createElement('img');        
        requestStatus.setAttribute("data-loading","");
        requestStatus.src = requestMessage.loading;
        requestStatus.style.cssText = `
        display: block;
        margin: 0% auto;
        `
        form.insertAdjacentElement ('afterend',requestStatus);
        const objectForJson = {};
        formData = new FormData(form);
        formData.forEach((value,key) => {
          objectForJson[key] = value;
        })
        createPost("http://localhost:3000/requests",JSON.stringify(objectForJson)).then(data=>
        data.json())
        .then((data)=>{
          console.log(data.status);
          console.log(data);
          requestStatus.remove();
          showModalThanks(requestMessage.sucesses);
          form.reset() 
        }).catch(() => {
          requestStatus.remove();
          showModalThanks(requestMessage.eror);
        })
      })
    }
    function showModalThanks(massege) {
      const modal = document.querySelector(".modal__dialog"),
            modalIn = document.querySelector("[data-modal-open]");
      const newModal = document.createElement("div");
      modal.classList.add("hire");
      newModal.innerHTML = `
      <div class="modal__dialog" data-messeage-dialog>
      <div class="modal__content">
      <div date-close class="modal__close">×</div>
      <div>${massege}</div>
      <div>
      `;
      newModal.style.textAlign = "center";
      modalIn.append(newModal);
      openModal();
      setTimeout(()=>{newModal.remove(); 
      closeModal();
      modal.classList.remove("hire");
      }, 5000);
    }
}
module.exports = serverPost;

/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((module) => {

function slider() {
    const wrapper = document.querySelector(".offer__slider-wrapper"),
          slids = document.querySelectorAll(".offer__slide"),
          previosSlid = document.querySelector(".offer__slider-prev"),
          offerSlider = document.querySelector(".offer__slider")
          nextSlid = document.querySelector(".offer__slider-next"),
          sliderFullWidth = document.querySelector(".offer__slider-iner");
          sliderWidth = window.getComputedStyle(wrapper).width;
          sliderFullWidth.style.width = Math.round(+sliderWidth.slice(0,sliderWidth.length - 2) * (slids.length)) + "px";
          wrapper.style.overflow = "hidden";
          sliderFullWidth.style.display = "flex";
          sliderFullWidth.style.transition = "0.5s all";
          const nowSlide = document.querySelector("#current");
          const lengthSlider = document.querySelector("#total");
          // create indicator
          offerSlider.style.position = "relative";
          const dots = document.createElement("ol");
          dots.classList.add("indicator")
          dots.style.cssText = `
              position: absolute;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 15;
              display: flex;
              justify-content: center;
              margin-right: 15%;
              margin-left: 15%;
              list-style: none;
            `
            offerSlider.append(dots);
          for (let i = 0;i <slids.length;i++) {
            const dot = document.createElement("li");
            dot.setAttribute("data-indicator",`${i + 1}`);
            dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`
            dots.append(dot);
          }
          // end create indicator
          if (slids.length < 10) {
            lengthSlider.innerHTML = "0" + slids.length;
          }else{lengthSlider.innerHTML = slids.length;}
          let indexSlider = 1;
          let offsetSlider = 0;
          // indecator function
          function currentSlider(index) {
            if(index < 10) {
              nowSlide.textContent = "0" + index;
            }else {
              nowSlide.textContent =  index;
            }
          }
          const fulDots = dots.querySelectorAll('li');
          indicatorSet();
          currentSlider(indexSlider);
          function indicatorSet() {
            fulDots.forEach((e) => {
              e.style.opacity = '.5'
              if (e.getAttribute('data-indicator') == indexSlider) {
                e.style.opacity = "1";
              }
            })
          };
          previosSlid.addEventListener("click", ()=>{
            if(offsetSlider == 0) {
              offsetSlider = Math.round(+(sliderFullWidth.style.width.slice(0, sliderFullWidth.style.width.length - 2)) - (+sliderWidth.slice(0, sliderWidth.length - 2)));
            }else{
              offsetSlider -= Math.round(+sliderWidth.slice(0,sliderWidth.length - 2));
            }
            indexSlider--;
            if(indexSlider < 1){
              indexSlider = slids.length;
            }
            currentSlider(indexSlider)
            sliderFullWidth.style.transform = `translateX(${-offsetSlider}px)`
            indicatorSet();
          })
          nextSlid.addEventListener("click", ()=>{
            if(offsetSlider == Math.round(+(sliderFullWidth.style.width.slice(0, sliderFullWidth.style.width.length - 2)) - (+sliderWidth.slice(0, sliderWidth.length - 2)))) {
              offsetSlider = 0;
            }else{
              offsetSlider += Math.round(+sliderWidth.slice(0,sliderWidth.length - 2));
            }
            indexSlider++;
            if(indexSlider > slids.length) {
              indexSlider = 1;
            }else {indexSlider}
            currentSlider(indexSlider);
            sliderFullWidth.style.transform = `translateX(${-offsetSlider}px)`
            indicatorSet();
          })
          fulDots.forEach(e => {
            e.addEventListener("click",(event)=> {
              indexSlider = +event.target.getAttribute("data-indicator");
              offsetSlider = (Math.round(+sliderWidth.slice(0,sliderWidth.length - 2) * (indexSlider - 1)))
              sliderFullWidth.style.transform = `translateX(${-offsetSlider}px)`;
              currentSlider(indexSlider);
              indicatorSet();
            })
          });
}
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
      let tHeader = document.querySelector(".tabheader__items"),
          tItem = document.querySelectorAll(".tabheader__item"),
          tabContent = document.querySelectorAll(".tabcontent");
      let startTimer
      function clearTabContant() {
        tItem.forEach(function (tItem) {
          tItem.classList.remove("tabheader__item_active")
        } )
        tabContent.forEach(item => {
          item.classList.remove("show");
          item.classList.add("hire");
        })
      };
      clearTabContant();
      function showTabContant (element = 0) {
        tItem[element].classList.add("tabheader__item_active");
        tabContent[element].classList.remove("hire");
        tabContent[element].classList.remove("show");
      };
      showTabContant();
      tHeader.addEventListener("click",(event) => {
        const target = event.target;
        if(target && target.classList.contains("tabheader__item")){
          tItem.forEach((item,index) => {
            if(item === target) {
              clearTabContant();
              showTabContant(index);
            }
          })
        }
      })
}
module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
document.addEventListener("DOMContentLoaded",()=>{
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        serverWindow = __webpack_require__(/*! ./modules/server */ "./js/modules/server.js"),
        sliders = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

        tabs();
        timer();
        cards();
        modal();
        serverWindow(); 
        sliders(); 
        calc(); 

        
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map