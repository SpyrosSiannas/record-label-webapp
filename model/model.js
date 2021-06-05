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
    var sql = "SELECT * FROM Artist";
    con.query(sql, function (err, result) {
        callback(result);
    });
};

exports.getArtistSingle = function(artistId, callback) {
    var sql = "SELECT * FROM Artist WHERE artist_id = " + con.escape(artistId);
    con.query(sql, function (err, result) {
        fs.readFile("./public/" + result[0].bio_url, (err, data)=>{
            callback(result, data);
        });
    });
};
