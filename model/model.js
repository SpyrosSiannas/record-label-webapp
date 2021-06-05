'use strict';

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "sql11.freemysqlhosting.net",
  user: "sql11409448",
  database: "sql11409448",
  password: "Br6TJqP2xd"
});

exports.getArtists = function(callback) {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT * FROM Artist";
        con.query(sql, function (err, result) {
            if (err) throw err;
            callback(result);
        });
    });
}
