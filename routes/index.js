var express = require('express');
var recive = require('../models/reciveData');
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
    recive.reciveData(req.body,'douyu');
    res.json({msg:'success'})
});
router.post('/huya', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body,'huya');
    res.json({msg:'success'})
});
router.post('/bilibli', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body,'bilibli');
    res.json({msg:'success'})
});
router.post('/panda', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body,'panda');
    res.json({msg:'success'})
});
router.post('/yy', function (req, res, next) {
    // console.log(req.body);
    recive.reciveData(req.body,'yy');
    res.json({msg:'success'})
});
module.exports = router;
