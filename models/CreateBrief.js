var schedule = require('node-schedule');
var UtilsCreateBriefTable = require("../Utils/UtilsCreateBriefTable");
var rule = new schedule.RecurrenceRule();
rule.second = 0;
exports.startCreate = function () {
    var tables = ['bilili', 'douyu', 'huajiao', 'huya', 'laifeng', 'longzhu', 'panda', 'sixrooms', 'yy'];
    var i = 0;
    schedule.scheduleJob(rule, function () {
        if (i >= tables.length) {
            i = 0;
            this.cancel();
            return;
        }
        UtilsCreateBriefTable.CreateBrief(tables[i]);
        i++;
    });
};