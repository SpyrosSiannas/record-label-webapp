window.onclick = function(event) {
    if (event.target.id == "signin-modal") {
      closeLoginModal();
    }
    if (event.target.id == "signup-modal") {
      closeSignupModal();
    }
    if (event.target.id == "body-overlay") {
        closeSideNav();
    }
    if (event.target.classList.contains("merch-modal")){
      closeMerchModal(event.target.id);
    }
}

function openLoginModal(){
    var modal = document.querySelector("#signin-modal");
    modal.style.display = "flex";
}

function closeLoginModal(){
    var modal = document.querySelector("#signin-modal");
    modal.style.display = "none";
    var modalText = modal.querySelector(".error-message");
    if (modalText){
      modalText.style.display = "none";
    }
}

function openSignupModal(){
    var modal = document.querySelector("#signup-modal");
    modal.style.display = "flex";
}

function closeSignupModal(){
    var modal = document.querySelector("#signup-modal");
    modal.style.display = "none";
    var modalText = modal.querySelector(".error-message");
    if (modalText){
      modalText.style.display = "none";
    }
}

function closeSuccessMesasge(){
  var regSuccess = document.querySelector(".reg-success");
  setTimeout(function()  {
    regSuccess.style.display = "none";
  }, 1000)
}

function openSideNav(){
  document.querySelector(".sidenav").style.width = "250px";
  document.querySelector("#main-panel").style.marginLeft = "calc(150px + 20%)";
  var overlay = document.querySelector(".body-overlay");
  overlay.style.display = "flex";
  overlay.style.opacity = "100%";
}

function closeSideNav(){
  document.querySelector(".sidenav").style.width = "0px";
  document.querySelector("#main-panel").style.marginLeft = "";
  var overlay = document.querySelector(".body-overlay");
  overlay.style.display = "none";
  overlay.style.opacity = "0%";
}
