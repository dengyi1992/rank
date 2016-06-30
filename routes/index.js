var express = require('express');
var recive = require('../models/reciveData');
var getTags = require("../models/getTags.js");
var TagTimer = require("../controler/TagUtils.js");
var UtilsCreateBriefTable=require("../Utils/UtilsCreateBriefTable");
var CreateBrief=require("../models/CreateBrief");

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
/**
 * 斗鱼数据传输
 * 以json传输
 */
router.post('/douyu', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'douyu');
    res.json({msg: 'success'})
});
router.post('/huya', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'huya');
    res.json({msg: 'success'})
});
router.post('/bilibli', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'bilibli');
    res.json({msg: 'success'})
});
router.post('/panda', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'panda');
    res.json({msg: 'success'})
});
router.post('/yy', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'yy');
    res.json({msg: 'success'})
});
router.post('/sixrooms', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'sixrooms');
    res.json({msg: 'success'})
});
router.post('/longzhu', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'longzhu');
    res.json({msg: 'success'})
});
router.post('/huajiao', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'huajiao');
    res.json({msg: 'success'})
});
router.post('/laifeng', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'laifeng');
    res.json({msg: 'success'})
});
router.post('/ingkee', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body, 'ingkee');
    res.json({msg: 'success'})
});
router.get('/getAllTag', function (req, res, next) {
    if (TagTimer.TagTimer()){
        res.json({msg: 'success,开始...'})
    }else {
        res.json({msg: '还有个任务在进行中'})
    }
});
router.get('/test',function (req, res, next) {
    CreateBrief.test();
    res.json({msg: '测试接口'})

});
// router.get('/test1',function (req, res, next) {
//     // CreateBrief.startCreate();
// });
module.exports = router;
