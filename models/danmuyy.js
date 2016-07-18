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
    myEvents.emit('insertDanMu', 'yy', roomId, body);
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
        /**
         * item.response    JSON.parse(message.utf8Data).gifts["0"].from_name   JSON.parse(message.utf8Data).flowers["0"].flw_num
         * item.chat_msg    JSON.parse(message.utf8Data).gifts["0"].from_uid    JSON.parse(message.utf8Data).flowers["0"].from_name
         * item.font        JSON.parse(message.utf8Data).gifts["0"].gift_num    JSON.parse(message.utf8Data).flowers["0"].from_uid
         * item.gender      JSON.parse(message.utf8Data).gifts["0"].gift_type   JSON.parse(message.utf8Data).flowers["0"].time
         * item.nick        JSON.parse(message.utf8Data).gifts["0"].to_name     JSON.parse(message.utf8Data).flowers["0"].to_name
         * item.response    JSON.parse(message.utf8Data).gifts["0"].to_uid      JSON.parse(message.utf8Data).flowers["0"].to_uid
         * item.roler
         * item.size
         * item.yyid
         * @type {number}
         */
        var type = 0;
        var insertParams;
        switch (item.response){
            case "chat":
                insertParams = [item.nick, item.yyid, item.chat_msg, item.gender, 0, 0, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;

            case "gift_broadcast":
                insertParams = [item.gifts["0"].from_name, item.gifts["0"].from_uid, item.gifts["0"].gift_num, item.gifts["0"].gift_type, 1, 0, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];

                break;
            case "flower_broadcast":
                insertParams = [item.flowers["0"].from_name, item.flowers["0"].from_uid, item.flowers["0"].flw_num, '', 2, 0, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];

                break;
            
        }
        // var device_type = (item.data.from.__plat == 'pc_web') ? 0 : 1;
        // insertParams = [item.nick, item.yyid, item.chat_msg, item.data.from.level, item.type, device_type, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
        values.push(insertParams);
    }
    conn.query(insertSql, [values], function (err, rows, field) {
        if (err) {
            return console.log(err)
        }
    })
});