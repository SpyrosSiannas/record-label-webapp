function cancelOrder(orderId,userId){
    fetch("/clearOrder?" + new URLSearchParams({
        userId: userId,
        orderId: orderId
    })).then(location.reload());
}

function deliverOrder(orderId,userId){
    fetch("/deliverOrder?" + new URLSearchParams({
        userId: userId,
        orderId: orderId
    })).then(location.reload());
}