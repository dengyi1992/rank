/**
 * Created by deng on 16-6-7.
 */
var mysql = require('mysql');
var config = require("../config.js");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var conn = mysql.createConnection(config.db);
var start = 1;
var isTagFinish = false;
exports.getTags=function () {
    var limit_range = (start - 1) * 10 + ',' + 20;
    var userAddSql = 'SELECT * FROM tags limit ' + limit_range + ';';
    conn.query(userAddSql, function (err, rows, fields) {
        if (err) {
            return console.log(err.message);
        }
        if (rows.length == 0) {
            return isTagFinish = true;
        }
        for (var i = 0; i < rows.length; i++) {
            myEvents.emit('geted', rows[i].tag);
        }
    });
    start = start + 1;
    if (isTagFinish) {
        isTagFinish = false;
        start = 1;
        return true;
    } else {
        return false;
    }
};
myEvents.on('geted', function (tags) {
    try {
        var split = tags.split(',');
        for (var i = 0; i < split.length; i++) {
            var tag = split[i];
            myEvents.emit('insertTag', tag);
        }
    } catch (e) {
        console.log(e);
    }

});
myEvents.on('insertTag', function (tag) {
    var sql = 'insert alltags (tag) value (?)';
    var params = [tag];
    conn.query(sql, params, function (err, fleid) {
        if (err) {
            return console.log(err);
        }
    });
});