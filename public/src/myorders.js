function cancelOrder(orderId,userId){
    fetch("/clearOrder?" + new URLSearchParams({
        userId: userId,
        orderId: orderId
    })).then(location.reload());
}