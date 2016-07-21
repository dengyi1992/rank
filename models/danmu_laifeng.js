/**
 * Created by hzq on 16-7-21.
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
    myEvents.emit('insertDanMu', 'laifeng', roomId, body);
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
        var item1 = item.args["0"];
        var item2 = item1.body;
        /**body.data["20"].name
         * body.data["20"].args["0"].body.n
         * body.data["20"].args["0"].uid
         * body.data["20"].args["0"].body.f
        
         * @type {number}
         */
        var type = 0;
        var insertParams;
        switch (item.name) {
            case "enterMessage":
                insertParams = [item2.n, item1.uid, 'WELCOME', item2.l, 'enterMessage', item2.s, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            case "chatMessage":
                insertParams = [item2.n, item1.uid, item2.m, item2.l, 'chatMessage', item2.al, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            case "sendStar":
                insertParams = [item2.n, item2.tq, item2.gd, item2.l, 'sendStar', item2.q, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            case "sendBigGift":
                insertParams = [item2.n, item2.rm, item2.tt, item2.l, 'sendBigGift', item2.gd, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            case "globalHornMessage":
                insertParams = [item2.n, item2.ar, item2.m, item2.l, 'globalHornMessage', item2.g, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            case "sendGift":
                insertParams = [item2.n, item2.ti, item2.gd, item2.l, 'sendGift', item2.al, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            default:
                break;
        }
        // var device_type = (item.data.from.__plat == 'pc_web') ? 0 : 1;
        // insertParams = [item.data.from.nickName, item.data.from.rid, item.data.content, item.data.from.level, item.type, device_type, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
        values.push(insertParams);
    }
    conn.query(insertSql, [values], function (err, rows, field) {
        if (err) {
            return console.log(err)
        }
    })
});