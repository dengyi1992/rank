var schedule = require('node-schedule');
var UtilsCreateBriefTable = require("../Utils/UtilsCreateBriefTable");
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var rule = new schedule.RecurrenceRule();
rule.second = 0;
var tables = ['bilili', 'douyu', 'huajiao', 'huya', 'laifeng', 'longzhu', 'panda', 'sixrooms', 'yy'];
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
exports.test = function () {
    myEvents.emit('createRank')
};

myEvents.on('createRank',function () {
   UtilsCreateBriefTable.CreateBriefRank();
    var j=0;
    schedule.scheduleJob(rule, function () {
        if (j >= tables.length) {
            j = 0;
            this.cancel();
            return;
        }
        UtilsCreateBriefTable.copyTableToRank(tables[j]);
        j++;
    });
});

