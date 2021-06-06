'use strict';

const mysql = require('mysql');
const fs = require('fs');
const { CONNREFUSED } = require('dns');

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
    console.log(order)
    const sql = "INSERT INTO PurchaseOrder(date_ordered, Status,ord_tel,ord_street,ord_city, ord_province,ord_country,ord_postcode,ord_apt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const getLastOrderSQL = "SELECT MAX(order_id) FROM PurchaseOrder"
    const sqlRelationship = "INSERT INTO Places(ord_id, us_id) VALUES (?, ?)"
    con.query(sql,[
        order.date,
        '1', // Default Order Status
        order.telephone,
        order.street,
        order.city,
        order.province,
        order.country,
        order.postcode,
        order.apt], (err,res1)=>{
            con.query(getLastOrderSQL, (err, result) => {
                var lastOrder = String(result[0]['MAX(order_id)']);
                con.query(sqlRelationship, [lastOrder, order.userId], (error, res2)=>{
                    console.log(error,res2)
                    callback(error, res2);
                })
            })
        })
}
