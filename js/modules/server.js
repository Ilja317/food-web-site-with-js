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