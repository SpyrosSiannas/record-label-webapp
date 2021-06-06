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

exports.getMerch = function(callback) {
    const sql = "SELECT * FROM Merch";
    con.query(sql, function(err, result) {
        callback(result);
    })
}

exports.auth = function(username, password, callback) {
    con.query("SELECT * FROM User WHERE email = ? AND password = ?",
    [username, password], (err, result)=>{
        if (result) {
            if(result.length){
                con.query("SELECT fname, lname FROM User WHERE email = ?", [username], (err, result)=>{
                    var fullName = result[0].fname + ' ' + result[0].lname;
                    callback(fullName)
                });
            } else {
                con.query("SELECT fname, lname FROM User WHERE email = ?", [username], (err, result)=>{
                    var fullName = result[0].fname + ' ' + result[0].lname;
                    callback()
                });
            }
        }
    })
}

exports.register = function(mail, pwd, fname, lname, callback) {
    const sql = "INSERT INTO User(email, password, fname, lname) VALUES(?, ?, ?, ?)"
    con.query(sql, [mail, pwd, fname, lname], (err, result)=>{
        if (result) { 
            con.query("SELECT fname, lname FROM User WHERE email = ?", [mail], (err, result)=>{
                var fullName = result[0].fname + ' ' + result[0].lname;
                callback(fullName)
            });
        }
        if(err) {
            console.log(err)
        }
    })
}