function tabs(parentsSelector,selector,tab,activeClass) {
      let tHeader = document.querySelector(parentsSelector),
          tItem = document.querySelectorAll(selector),
          tabContent = document.querySelectorAll(tab);
      function clearTabContant() {
        tItem.forEach(function (tItem) {
          tItem.classList.remove(activeClass)
        } )
        tabContent.forEach(item => {
          item.classList.remove("show");
          item.classList.add("hire");
        })
      };
      clearTabContant();
      function showTabContant (element = 0) {
        tItem[element].classList.add(activeClass);
        tabContent[element].classList.remove("hire");
        tabContent[element].classList.remove("show");
      };
      showTabContant();
      tHeader.addEventListener("click",(event) => {
        const target = event.target;
        if(target && target.classList.contains(selector.slice(1))){
          tItem.forEach((item,index) => {
            if(item === target) {
              clearTabContant();
              showTabContant(index);
            }
          })
        }
      })
}
export default tabs;