/**
 * Created by hzq on 16-7-12.
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
    myEvents.emit('insertDanMu', 'pandatv', roomId, body);
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
    for (var i = 0; i < body.msg.length; i++) {
        var item = body.msg[i];
        /**
         * msg.data.from.nickName
         * msg.data.from.rid
         * msg.data.from.level
         * msg.data.content
         * msg.type
         * msg.data.from.__plat
         * msg.ctime
         * @type {number}
         */
        var type =item.type==1?0:1;
        var insertParams;
        var device_type = (item.data.from.__plat == 'pc_web') ? 0 : 1;
        insertParams = [item.data.from.nickName, item.data.from.rid, item.data.content, item.data.from.level, type, device_type, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
        values.push(insertParams);
    }
    conn.query(insertSql, [values], function (err, rows, field) {
        if (err) {
            return console.log(err)
        }
    })
});