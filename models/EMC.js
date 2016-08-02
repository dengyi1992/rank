/**
 * Created by deng on 16-8-2.
 */
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var CreateBrief=require('./CreateBrief');


exports.emcUpdate=function () {
    CreateBrief.startCreate();
};