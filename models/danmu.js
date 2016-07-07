/**
 * Created by deng on 16-7-7.
 */
var mysql = require('mysql');
var config = require("../config.js");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var conn = mysql.createConnection(config.db);
var TimeUtils=require('../Utils/TimeUtils');
exports.DanMuSave=function (platform,roomId,body) {
    myEvents.emit('insertDanMu', platform,roomId,body);
};
myEvents.on('insertDanMu', function (platform,roomId,body) {
    var tablename=platform+'_'+roomId+'_chat_'+TimeUtils.GetCrruentTime();
    var sql = 'CREATE TABLE IF NOT EXISTS ' + tablename + ' LIKE danmumodel ; ';
    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });
    var insertSql = 'INSERT INTO ' + tablename + ' (nickname,uid,msg,level,type,device_type) VALUES ?';
    var values=[];
    for (var i = 0; i < body.data.length; i++) {

        var item = body.data[i];
        var insertParams = [item.nn, item.uid, item.txt, item.level, item.type,item.ct];
        values.push(insertParams)
    }
    conn.query(insertSql, [values], function (err, rows, field) {
        if (err) {
            return console.log(err)
        }
    })
});