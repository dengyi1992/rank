/**
 * Created by hzq on 16-7-27.
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
    myEvents.emit('insertDanMu', 'ingkee', roomId, body);
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
        var item1 = item.ms[0].from;
        var insertParams;
        switch (item.dest) {
            case 2:
                insertParams = [item1.nic, item1.id, item.c, item1.lvl, 0, 1, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
            case 3:
                insertParams = [item1.nic, item1.id, item.c, item1.lvl, 1, 1, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
        }

        /**body.data["20"].name
         * body.data["0"].ms["0"].n
         body.data["0"].ms["0"].to
         * @type {number}

         var type = 0;
         var insertParams;
         try {
            if (0 == item1.to) {
                insertParams = [item2.nic, item.userid, item1.c, item2.lvl, 0, 1, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
            } else {
                insertParams = [item2.nic, item.userid, item1.c, item2.lvl, 1, 1, new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
            }
        } catch (e) {
            console.log('data error' + e);
        }
         */
        // var device_type = (item.data.from.__plat == 'pc_web') ? 0 : 1;
        // insertParams = [item.data.from.nickName, item.data.from.rid, item.data.content, item.data.from.level, item.type, 
        // 


        // 
        // 
        // , new Date(item.ctime).format("yyyy-MM-dd hh:mm:ss")];
        values.push(insertParams);
    }
    conn.query(insertSql, [values], function (err, rows, field) {
        if (err) {
            return console.log(err)
        }
    })
});