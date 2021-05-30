window.onclick = function(event) {
    if (event.target.id== "signin-modal") {
      closeLoginModal();
    }
}

function openLoginModal(){
    var modal = document.querySelector("#signin-modal");
    modal.style.display = "flex";
}

function closeLoginModal(){
    var modal = document.querySelector("#signin-modal");
    modal.style.display = "none";
}