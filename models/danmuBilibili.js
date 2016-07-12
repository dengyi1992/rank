/**
 * Created by deng on 16-7-7.
 */
var mysql = require('mysql');
var config = require("../config.js");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var conn = mysql.createConnection(config.db);
var TimeUtils=require('../Utils/TimeUtils');
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
exports.DanMuSave=function (roomId,body) {
    myEvents.emit('insertDanMu', 'bilibli',roomId,body);
};
myEvents.on('insertDanMu', function (platform,roomId,body) {
    var tablename=platform+'_'+roomId+'_chat_'+TimeUtils.GetCrruentTime();
    var sql = 'CREATE TABLE IF NOT EXISTS ' + tablename + ' LIKE danmumodel ; ';
    // 59125::::::{"cmd":"WELCOME","data":{"isadmin":0,"vip":1,"uid":16379590,"uname":"搓着咸鱼瞪着喵"},"roomid":59125,"ctime":1468289618122}
    // 59125::::::{"cmd":"WELCOME","data":{"isadmin":0,"vip":1,"uid":13445083,"uname":"麻花辫姐姐"},"roomid":59125,"ctime":1468289620266}
    // 59125::::::{"info":[[0,1,25,16777215,1468289621,"1468289279",0,"6ab11cdd",0],"是纸巾",[31108542,"狮子的酱油瓶",0,0,0,10000],[],[3,">1000000",16754085],[]],"cmd":"DANMU_MSG","ctime":1468289622586}
    // 59125::::::{"cmd":"WELCOME","data":{"isadmin":0,"vip":1,"uid":13369154,"uname":"YZshadow"},"roomid":59125,"ctime":1468289624883}
    // 59125::::::{"info":[[0,1,25,16777215,1468289626,"1468288756",0,"b317b78f",0],"纸巾是水吧",[22596990,"笔笔呐都",0,0,0,10000],[1,"2333","暴走吧bilibili",2333,9953448],[6,">1000000",16740721],[]],"cmd":"DANMU_MSG","ctime":1468289627471}
    // 1016::::::{"cmd":"SEND_GIFT","data":{"giftName":"辣条","num":10,"uname":"莉莉奧","rcost":25069252,"uid":6547425,"top_list":[],"timestamp":1468289620,"giftId":1,"giftType":0,"action":"喂食","super":0,"price":100,"rnd":"1468289615","newMedal":0,"medal":1,"capsule":[]},"roomid":1016,"ctime":1468289627530}
    // 1016::::::{"cmd":"SEND_GIFT","data":{"giftName":"亿圆","num":1,"uname":"莉莉奧","rcost":25069262,"uid":6547425,"top_list":[],"timestamp":1468289624,"giftId":6,"giftType":0,"action":"赠送","super":0,"price":1000,"rnd":"1468289615","newMedal":0,"medal":1,"capsule":[]},"roomid":1016,"ctime":1468289631524}
    // 59125::::::{"cmd":"SEND_GIFT","data":{"giftName":"辣条","num":2,"uname":"冰糖小李","rcost":3702011,"uid":18553907,"top_list":[],"timestamp":1468289615,"giftId":1,"giftType":0,"action":"喂食","super":0,"price":100,"rnd":"1468289123","newMedal":0,"medal":-2,"capsule":[]},"roomid":59125,"ctime":1468289633929}

    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });
    var insertSql = 'INSERT INTO ' + tablename + ' (nickname,uid,msg,level,type,device_type,ctime) VALUES ?';
    var values=[];
    for (var i = 0; i < body.data.length; i++) {
        var item = body.data[i];
        var type=0;
        var insertParams;
        switch (item.cmd){
            case 'chatmsg':
                insertParams= [item.info[2][1], item.info[2][0], item.info[1], item.info[4][0],1,0,new Date(item.data.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            case 'SEND_GIFT':
                insertParams= [item.data.uname, item.data.uid, item.data.giftName, item.data.vip,2,0,new Date(item.data.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break;
            case 'WELCOME':
                type=0;
                insertParams= [item.data.uname, item.data.uid, '', item.data.vip,0,0,new Date(item.data.ctime).format("yyyy-MM-dd hh:mm:ss")];
                break; 
        }
        values.push(insertParams)
    }
    conn.query(insertSql, [values], function (err, rows, field) {
        if (err) {
            return console.log(err)
        }
    })
});