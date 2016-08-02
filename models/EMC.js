/**
 * Created by deng on 16-8-2.
 */
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var CreateBrief=require('./CreateBrief');

var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
myEvents.on("emcUpdate",function () {
    CreateBrief.startCreate();
});
exports.emcUpdate=function () {
   myEvents.emit("emcUpdate");
};