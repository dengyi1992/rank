var schedule = require('node-schedule');
var UtilsCreateBriefTable = require("../Utils/UtilsCreateBriefTable");
var TimeUtils = require("../Utils/TimeUtils");
var request = require('request');
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var rule = new schedule.RecurrenceRule();
rule.second = 0;
var tables = ['bilibli', 'douyu', 'huajiao', 'huya', 'laifeng', 'longzhu', 'panda', 'sixrooms', 'yy', 'ingkee'];
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
    myEvents.emit('RankMonth');
};

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
        UtilsCreateBriefTable.createMonthTable(tables[i], TimeUtils.GetYesterdayYearMonth());
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
myEvents.on('RankMonth', function () {
    UtilsCreateBriefTable.CreateBriefRankMonth();
    UtilsCreateBriefTable.copyTableToRankMonth();
    myEvents.emit('phpUpdate');
});
var tablesupdate = ['bilibli', 'douyu', 'huya', 'laifeng', 'longzhu', 'panda', 'sixrooms', 'yy', 'ingkee'];
function update_chat_month() {
    request('http://rank2.dataguiding.com/Home/NewTable/update_chat_month', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
            update_anchor_table();
        }
    );
}
function update_anchor_table() {
    request('http://rank2.dataguiding.com/Home/NewTable/update_anchor_table', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
            update_platform_table();
        }
    );
}
function update_platform_table() {
    request('http://rank2.dataguiding.com/Home/NewTable/update_platform_table', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
            update_total();
        }
    );
}
function update_total() {
    request('http://rank2.dataguiding.com/Home/NewTable/update_total', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
}
myEvents.on('zhang', function () {
    update_chat_month();
});
myEvents.on('xiaozhang', function () {
    var k = 0;
    schedule.scheduleJob(rule, function () {
        if (k >= tablesupdate.length) {
            k = 0;
            myEvents.emit("zhang");
            this.cancel();
            return;
        }
        request('http://rank2.dataguiding.com/Home/NewTable/update_' + tablesupdate[k] + '_chat', function (error, response, body) {
                if (error) {
                    return console.log(error)
                }
            }
        );
        k++;
    });
});
myEvents.on('phpUpdate', function () {
    request('http://120.27.94.166/ranknew/index.php/Home/MainPage/anchor_rank_hour_deal', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
    request('http://120.27.94.166/ranknew/index.php/Home/MainPage/anchor_rank_week_deal', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
    request('http://120.27.94.166/ranknew/index.php/Home/MainPage/platform_rank_hour_deal', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
    request('http://120.27.94.166/ranknew/index.php/Home/MainPage/platform_rank_week_deal', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
    request('http://120.27.94.166/ranknew/index.php/Home/MainPage/sort_rank_hour_deal', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
    request('http://120.27.94.166/ranknew/index.php/Home/MainPage/sort_rank_week_deal', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
    request('http://120.27.94.166/ranknew/index.php/Home/CrawlerInfo/mainInfo', function (error, response, body) {
            if (error) {
                return console.log(error)
            }
        }
    );
    // request('http://rank2.dataguiding.com/Home/NewTable/create_final_table', function (error, response, body) {
    //         if (error) {
    //             return console.log(error)
    //         }
    //
    //     }
    // );
    myEvents.emit('xiaozhang');

});


