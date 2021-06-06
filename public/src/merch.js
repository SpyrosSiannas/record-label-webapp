function openMerchModal(id){
    var modal = document.querySelector("#merch-modal-"+String(id))
    modal.style.display = "flex";
}

function closeMerchModal(id){
    console.log(id);
    var modal = document.querySelector("#"+id)
    modal.style.display = "none";
}