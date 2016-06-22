
var mysql = require('mysql');
var config = require("../config.js");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var conn = mysql.createConnection(config.db);
var TimeUtils = require('../Utils/TimeUtils');
exports.CreateBrief = function (tablename) {
    myEvents.emit('createBrief', tablename);
};
myEvents.on('createBrief', function (data, tablename) {
    var getCrruentTime = TimeUtils.GetCrruentTime;
    var selectTable='orignal_'+tablename+'_'+getCrruentTime;
    var createTable='brief_'+tablename+'_'+getCrruentTime;

    var createSql='CREATE TABLE  ' +createTable+
    '   AS SELECT  room_id ,COUNT( room_id ),room_name ,owner_uid ,nickname ,game_name ,face ,tags ,AVG( score ) AS  score ,AVG( fans ) AS  avgFans ,AVG( online ) AS  avgOnline ,MAX( fans ) AS  maxFans ,MAX( online )AS  maxOnline FROM  ' +
    selectTable +
    ' GROUP BY  room_id ORDER BY AVG( score ) DESC LIMIT 0,500';
    conn.query(createSql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });
});
