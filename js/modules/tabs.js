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