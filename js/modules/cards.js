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
export default cards;