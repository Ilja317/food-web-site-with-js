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