/**
 * Created by deng on 16-6-21.
 * @return {string}
 */
exports.GetCrruentTime = function () {
    var date = new Date();
    return date.getFullYear() + '_' +
        date.getMonth() + '_' +
        date.getDay();
    // console.log(date.getFullYear() + '年' +
    //     date.getMonth() + '月' +
    //     date.getDay() + '号' +
    //     date.getHours() + '时' +
    //     date.getMinutes() + '分' +
    //     date.getSeconds() + '秒'
    // )
};