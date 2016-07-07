/**
 * Created by deng on 16-7-7.
 */
var mysql = require('mysql');
var config = require("../config.js");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var conn = mysql.createConnection(config.db);
var TimeUtils=require('../Utils/TimeUtils');
exports.getRooms=function (paltform,topn,callback) {
    var getCrruentTime = TimeUtils.GetYesterday();
    var selectTable = 'brief_' + paltform + '_' + getCrruentTime;

    var sql="SELECT `room_id`  FROM " +selectTable+
        " ORDER BY `score` DESC LIMIT 0,"+topn;
    conn.query(sql, function (err, rows, field) {
        if (err) {
            return callback(err);
        }
        callback(null,rows);
    });
};