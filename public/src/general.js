window.onclick = function(event) {
    if (event.target.id == "signin-modal") {
      closeLoginModal();
    }
    if (event.target.id == "signup-modal") {
      closeSignupModal();
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

function openSignupModal(){
    var modal = document.querySelector("#signup-modal");
    modal.style.display = "flex";
}

function closeSignupModal(){
    var modal = document.querySelector("#signup-modal");
    modal.style.display = "none";
}