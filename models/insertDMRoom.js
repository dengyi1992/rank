/**
 * Created by deng on 16-7-12.
 * 弹幕房间插入
 */
var mysql = require('mysql');
var config = require("../config.js");
var conn = mysql.createConnection(config.db);
var TimeUtils = require('../Utils/TimeUtils');
exports.InsertRoom=function (platform,roomid) {
    var tablename = 'chat_'+platform+'_'+ TimeUtils.GetYesterday();
    var sql = 'CREATE TABLE IF NOT EXISTS ' + tablename + ' LIKE chat_douyu_tpl ; ';
    var insertSql='INSERT INTO ' +tablename+
        ' (`room_id` ) VALUES(?)';
    conn.query(sql,function (err, rows) {
        if (err){
            return console.log(err);
        }
    });
    conn.query(insertSql,[roomid],function (err, rows) {
        if (err){
            return console.log(err);
        }
    })



};
