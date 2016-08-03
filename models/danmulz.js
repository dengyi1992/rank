/**
 * Created by hzq on 16-7-14.
 */
var mysql = require('mysql');
var config = require("../config.js");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var conn = mysql.createConnection(config.db);
var TimeUtils = require('../Utils/TimeUtils');
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
exports.DanMuSave = function (roomId, body) {
    myEvents.emit('insertDanMu', 'longzhu', roomId, body);
};
myEvents.on('insertDanMu', function (platform, roomId, body) {
    var tablename = platform + '_' + roomId + '_chat_' + TimeUtils.GetCrruentTime();
    var sql = 'CREATE TABLE IF NOT EXISTS ' + tablename + ' LIKE danmumodel ; ';

    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err);
        }
    });
    var insertSql = 'INSERT INTO ' + tablename + ' (nickname,uid,msg,level,type,device_type,ctime) VALUES ?';
    var values = [];
    for (var i = 0; i < body.data.length; i++) {
        var item = body.data[i];
        var type = 0;
        var insertParams;
        switch (item.type){
            case "chat":
                insertParams = [item.msg.user.username, item.msg.user.uid, item.msg.content, item.msg.user.grade, 0, item.msg.via, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;

            case "gift":
                insertParams = [item.msg.user.username, item.msg.user.uid, item.msg.itemType, item.msg.user.grade, 1, 0, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            case "userjoin":
                insertParams = [item.msg.username, item.msg.uid, "enter", item.msg.grade, 2, 0, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
            default:
                break;
            
        }

        values.push(insertParams);
    }
    conn.query(insertSql, [values], function (err, rows, field) {
        if (err) {
            return console.log(err)
        }
    })
});