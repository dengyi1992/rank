/**
 *
 CREATE TABLE `brief_yy_2016_6_22`  AS SELECT `room_id`,
 COUNT(`room_id`),
 `room_name`,
 `owner_uid`,
 `nickname`,
 `game_name`,
 `face`,
 `tags`,
 AVG(`score`) AS `score`,
 AVG(`fans`)AS `avgFans`,
 AVG(`online`)AS `avgOnline`,
 MAX(`fans`)AS `maxFans`,
 MAX(`online`)AS `maxOnline`
 FROM `orignal_yy_2016_6_22`
 GROUP BY `room_id`
 ORDER BY AVG(`score`) DESC LIMIT 0,500;

 */
var mysql = require('mysql');
var config = require("../config.js");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var conn = mysql.createConnection(config.db);
var TimeUtils = require('../Utils/TimeUtils');
exports.CreateBrief = function (tablename) {
    myEvents.emit('createBrief', tablename);
};
myEvents.on('createBrief', function (tablename) {
    var getCrruentTime = TimeUtils.GetCrruentTime();
    var selectTable = 'orignal_' + tablename + '_' + getCrruentTime;
    var createTable = 'brief_' + tablename + '_' + getCrruentTime;

    var createSql = "CREATE TABLE  " + createTable +
        "  AS SELECT  room_id ,COUNT( room_id ),room_name ,owner_uid ,nickname ,game_name ,face ,tags ,AVG( score ) AS  score ,AVG( fans ) AS  avgFans ,AVG( online ) AS  avgOnline ,MAX( fans ) AS  maxFans ,MAX( online ) AS  maxOnline ,\"" +
        tablename + "\" AS platform FROM  " + selectTable + " GROUP BY  room_id ORDER BY AVG( score ) DESC LIMIT 0,500";
    console.log(createSql);
    conn.query(createSql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });
});
exports.CreateBriefRank = function () {
    var tablename = 'brief_rank_' + TimeUtils.GetCrruentTime();
    var sql = 'CREATE TABLE IF NOT EXISTS ' + tablename + ' LIKE brief_dy ; ';
    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });

};
exports.copyTableToRank = function (tablename) {
    var ToTablename = 'brief_rank_' + TimeUtils.GetCrruentTime();
    var selectTable = 'brief_' + tablename + '_' + TimeUtils.GetCrruentTime();
    var sql = 'insert into ' + ToTablename + ' select * from ' + selectTable;
    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });

};
exports.createMonthTable = function (tablename, month) {
    var ToTablename = 'brief_' + tablename + '_' + month;
    var sql = 'CREATE TABLE IF NOT EXISTS ' + ToTablename + ' LIKE brief_dy ; ';
    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });
};
exports.copyMonthTable = function (tablename, month, day) {
    var ToTablename = 'brief_' + tablename + '_' + month;
    var selectTable = 'brief_' + tablename + '_' + TimeUtils.GetYesterday();
    var sql = 'insert into ' + ToTablename + ' select * from ' + selectTable;
    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });
};