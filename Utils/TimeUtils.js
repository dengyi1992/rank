/**
 * Created by deng on 16-6-21.
 * @return {string}
 */
exports.GetCrruentTime = function () {
    var date = new Date();
    var month = date.getMonth() + 1;
    return date.getFullYear() + '_' + month + '_' + date.getDate();

};
/**
 * @return {string}
 */
exports.GetYesterday = function () {
    var today = new Date();
    var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
    var yesterday = new Date(yesterday_milliseconds);
    var month = yesterday.getMonth() + 1;
    return yesterday.getFullYear() + '_' + month + '_' + yesterday.getDate();
};
/**
 * @return {string}
 * 获取本月
 */
exports.GetMonth = function () {
    var today = new Date();
    var month = today.getMonth() + 1;
    return today.getFullYear() + '_' + month;
};
/**
 * @return {number}
 */
exports.GetYesterdayMonth = function () {
    var today = new Date();
    var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
    var yesterday = new Date(yesterday_milliseconds);
    var month = yesterday.getMonth() + 1;
    return month;
};
/**
 * @return {number}
 */
exports.GetYesterdayDay = function () {
    var today = new Date();
    var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
    var yesterday = new Date(yesterday_milliseconds);
    var day = yesterday.getDate();
    return day;
};