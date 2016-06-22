/**
 * Created by deng on 16-6-21.
 * @return {string}
 */
exports.GetCrruentTime = function () {
    var date = new Date();
    var month = date.getMonth() + 1;
    var dateString = date.toLocaleDateString();
    return dateString.replace(/\//g, "_");
    // console.log(date.getFullYear() + '年' +
    //     date.getMonth() + '月' +
    //     date.getDay() + '号' +
    //     date.getHours() + '时' +
    //     date.getMinutes() + '分' +
    //     date.getSeconds() + '秒'
    // )
};
/**
 * @return {string}
 */
exports.GetYesterday = function () {
    var date = new Date();
    var   today=new   Date();
    var   yesterday_milliseconds=today.getTime()-1000*60*60*24;
    var Yesterday = new Date(yesterday_milliseconds);
    var yesterdayS = Yesterday.toDateString();
    return yesterdayS.replace(/\//g, "_");

};