document.addEventListener("DOMContentLoaded", () => {
  // tabs
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
  // Timer
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
    // modal Window
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
    
    timer = setTimeout(openModal,2000)
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
    // Class
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
    const firstObj = new NewSubject("img/tabs/vegy.jpg","vegy",'Меню "Фитнес"','Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',7,".menu__field .container",)
    const secondObj = new NewSubject("img/tabs/elite.jpg","elite",'Меню “Премиум”','В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',7,".menu__field .container",)
    const thirdObj = new NewSubject("img/tabs/post.jpg","post",'Меню "Постное"','Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',8,".menu__field .container",)
    firstObj.include();
    secondObj.include();
    thirdObj.include();
    // server first
    const forms = document.querySelectorAll("form"),
          requestMessage = {
              "loading": "/img/svg/5.2 spinner.svg",
              "sucesses": "All is sucesses",
              "eror": "An error has occurred"
            };
    forms.forEach(item => {
      postForm(item)
    })
    function postForm(form) {
      form.addEventListener("submit", (e) => {
        const requestStatus = document.createElement('img');        
        requestStatus.setAttribute("data-loading","");
        requestStatus.src = requestMessage.loading;
        requestStatus.style.cssText = `
        display: block;
        margin: 0% auto;
        `
        form.insertAdjacentElement ('afterend',requestStatus);
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-type","aplication/json")

        const formData = new FormData(form),
              objectForJson = {};

        formData.forEach((value,key) => {
          objectForJson[key] = value;
        })
        const objectJson = JSON.stringify(objectForJson);
        console.log(objectJson);
        request.send(objectJson);
        request.addEventListener("load",() => {
          if(request.status === 200) {
            console.log(request.response);
            requestStatus.remove();
            showModalThanks(requestMessage.sucesses);
            form.reset()
          }else{
            requestStatus.remove();
            showModalThanks(requestMessage.eror);
          }
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
})

