var getTags = require("../models/getTags.js");
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var times = [];
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();

/**
 * Created by deng on 16-6-7.
 */
var isFinish = true;
/**
 * @return {boolean}
 */
exports.TagTimer = function () {
    if (isFinish) {
        myEvents.emit('start');
        isFinish=false;
    }
    return isFinish;


};
myEvents.on('start', function () {

    rule.second = times;
    for (var i = 0; i < 60; i = i + 5) {
        times.push(i);
    }
    schedule.scheduleJob(rule, function () {
        if (getTags.getTags()) {
            this.cancel();
            console.log('-----------------爬完了-------------------');
            isFinish=true;
        }
    });
});