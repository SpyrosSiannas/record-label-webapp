'use strict';

const mysql = require('mysql');
const fs = require('fs');

var con = mysql.createConnection({
  host: "sql11.freemysqlhosting.net",
  user: "sql11409448",
  database: "sql11409448",
  password: "Br6TJqP2xd"
});


exports.getArtists = function(callback) {
    const sql = "SELECT * FROM Artist";
    con.query(sql, function (err, result) {
        callback(result);
    });
};

exports.getArtistSingle = function(artistId, callback) {
    const sql = "SELECT * FROM Artist WHERE artist_id = " + con.escape(artistId);
    con.query(sql, function (err, result) {
        fs.readFile("./public/" + result[0].bio_url, (err, data)=>{
            callback(result, data);
        });
    });
};

exports.getEvents = function(callback) {
    const sql = "SELECT * FROM Event";
    con.query(sql, function(err,result) {
        var count = 0;
        var fsHandler = function(err, data) {
            result[count].text = data;
            count++;
            if (count==result.length){
                callback(result)
            }
        }
        for (const myEvent of result){
            fs.readFile("./public/" + myEvent.description_ev, fsHandler);
        }
    })
}

exports.getMerch = function(user_id, callback) {
    const sql = "SELECT * FROM Merch";

    con.query(sql, function(err, result) {
        if (user_id) {
            con.query("SELECT telephone, street, city, province,postal_code, country, apt FROM User WHERE user_id = ?", [user_id], (err, userData) => {
                var thisUserData = userData[0];
                for (let product of result) {
                    product.telephone = thisUserData.telephone;
                    product.street = thisUserData.street;
                    product.city = thisUserData.city;
                    product.province = thisUserData.province;
                    product.postal_code = thisUserData.postal_code;
                    product.country = thisUserData.country;
                    product.apt = thisUserData.apt;
                }
                callback(result)
            })
        }else {
            callback(result);
        }
    })
};

exports.getOrders = function (user_id, callback) {
    const fetchUserOrders = "SELECT ord_id FROM Places WHERE us_id = ?";
    const fetchOrderDetails = "SELECT date_ordered,Status,ord_price FROM PurchaseOrder WHERE order_id = ?"
    const fetchOrderProduct = "SELECT merch_id FROM Contains WHERE ord_id = ?"
    const fetchProductDetails = "SELECT img_pr from Merch WHERE product_id = ?"
    var counter = 0;
    var orders = []

    var finalCallback = function(thisOrder,thisID,thisImg, thisCallback,thisOrders, length) {
        var order = new Object();
        order.Status = thisOrder.Status;
        order.date_ordered = thisOrder.date_ordered;
        order.ord_price = thisOrder.ord_price;
        order.order_id = thisID;
        order.ord_img = thisImg;
        thisOrders.push(order);
        counter++
        if (counter == length) {
            thisCallback(orders);
        }
    }

    con.query(fetchUserOrders, [user_id], (err,res)=>{
        if (!res.length) {
            callback()
        }
        for (var i = res.length - 1; i >= 0; i--) {
            const userOrder = res[i];
            const thisId = userOrder.ord_id;
            con.query(fetchOrderDetails, [thisId], (err2, res2) => {
                con.query(fetchOrderProduct, [thisId], (err3, res3)=>{
                    const thisProductId = res3[0];
                    con.query(fetchProductDetails, [thisProductId.merch_id], (err4, res4)=>{
                        const thisOrder = res2[0];
                        const thisMerch = res4[0];
                        finalCallback(thisOrder, thisId,thisMerch.img_pr,callback,orders,res.length)
                    })
                })
            })
        }
    })
}

exports.auth = function(username, password, callback) {
    con.query("SELECT * FROM User WHERE email = ? AND password = ?",
    [username, password], (err, result)=>{
        if (result) {
            if(result.length){
                con.query("SELECT fname, lname, user_id FROM User WHERE email = ?", [username], (err, result)=>{
                    var fullName = result[0].fname + ' ' + result[0].lname;
                    var userId = result[0].user_id;
                    callback(fullName, userId)
                });
            } else {
                callback()
            }
        }
    })
}

exports.register = function(mail, pwd, fname, lname, callback) {
    const sql = "INSERT INTO User(email, password, fname, lname) VALUES(?, ?, ?, ?)"
    con.query(sql, [mail, pwd, fname, lname], (err, result)=>{
        if (result) { 
            con.query("SELECT fname, lname, user_id FROM User WHERE email = ?", [mail], (err, result)=>{
                var fullName = result[0].fname + ' ' + result[0].lname;
                var userId = result[0].user_id;
                callback(fullName, userId)
            });
        }
        if(err) {
            callback()
        }
    })
}

exports.placeOrder = function(order, callback) {
    const sql = "INSERT INTO PurchaseOrder(ord_price, date_ordered, Status,ord_tel,ord_street,ord_city, ord_province,ord_country,ord_postcode,ord_apt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const getLastOrderSQL = "SELECT MAX(order_id) FROM PurchaseOrder"
    const sqlRelationship = "INSERT INTO Places(ord_id, us_id) VALUES (?, ?)"
    const sqlContainsProd = "INSERT INTO Contains(ord_id, merch_id, amount) VALUES (?, ?, 1)"
    con.query(sql,[
        order.price,
        order.date,
        '1', // Default Order Status
        order.telephone,
        order.street,
        order.city,
        order.province,
        order.country,
        order.postcode,
        order.apt], (err,res1)=>{
            console.log(err)
            con.query(getLastOrderSQL, (err, result) => {
                var lastOrder = String(result[0]['MAX(order_id)']);
                con.query(sqlRelationship, [lastOrder, order.userId], (error, res2)=>{
                    con.query(sqlContainsProd, [lastOrder, order.productId], (error2, res3)=>{
                        callback(error,res3);
                    })
                })
            })
        })
}

exports.cancelOrder = function(orderId, callback){
    const sql = "UPDATE PurchaseOrder SET Status = 0 WHERE order_id = ?"
    con.query(sql, [Number(orderId)], (err, res)=>{
        callback()
    })
}
