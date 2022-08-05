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
export default calc;