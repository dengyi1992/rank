var schedule = require('node-schedule');
var UtilsCreateBriefTable = require("../Utils/UtilsCreateBriefTable");
var TimeUtils = require("../Utils/TimeUtils");

var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var rule = new schedule.RecurrenceRule();
rule.second = 0;
var tables = ['bilibli', 'douyu', 'huajiao', 'huya', 'laifeng', 'longzhu', 'panda', 'sixrooms', 'yy'];
exports.startCreate = function () {
    var i = 0;
    schedule.scheduleJob(rule, function () {
        if (i >= tables.length) {
            i = 0;
            myEvents.emit('createRank');
            this.cancel();
            return;
        }
        UtilsCreateBriefTable.CreateBrief(tables[i]);
        i++;
    });
};
// exports.test = function () {
//     myEvents.emit('RankMonth');
// };

myEvents.on('createRank', function () {
    UtilsCreateBriefTable.CreateBriefRank();
    var j = 0;
    schedule.scheduleJob(rule, function () {
        if (j >= tables.length) {
            j = 0;
            myEvents.emit('MonthTable');
            this.cancel();
            return;
        }
        UtilsCreateBriefTable.copyTableToRank(tables[j]);
        j++;
    });
});
myEvents.on('MonthTable', function () {
    for (var i = 0; i < tables.length; i++) {
        UtilsCreateBriefTable.createMonthTable(tables[i],TimeUtils.GetYesterdayYearMonth());
    }
    var k = 0;
    schedule.scheduleJob(rule, function () {
        if (k >= tables.length) {
            k = 0;
            myEvents.emit('RankMonth');
            this.cancel();
            return;
        }
        UtilsCreateBriefTable.copyMonthTable(tables[k], TimeUtils.GetYesterdayYearMonth(), TimeUtils.GetYesterdayDay());
        k++;
    });
});
myEvents.on('RankMonth',function () {
    UtilsCreateBriefTable.CreateBriefRankMonth();
    UtilsCreateBriefTable.copyTableToRankMonth();
});


