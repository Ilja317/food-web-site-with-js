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